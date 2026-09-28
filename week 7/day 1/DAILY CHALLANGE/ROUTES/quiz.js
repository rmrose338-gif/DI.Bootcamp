const express = require('express');
const router = express.Router();
const triviaQuestions = require('../models/triviaData');

// GET /quiz - Start or restart the quiz and show the current question
router.get('/', (req, res) => {
  // Initialize or reset session variables
  if (req.session.currentIndex === undefined || req.query.restart === 'true') {
    req.session.currentIndex = 0;
    req.session.score = 0;
  }

  const currentIndex = req.session.currentIndex;

  // If all questions have been answered, redirect to score page
  if (currentIndex >= triviaQuestions.length) {
    return res.redirect('/quiz/score');
  }

  const currentQuestion = triviaQuestions[currentIndex];

  res.status(200).json({
    questionNumber: currentIndex + 1,
    totalQuestions: triviaQuestions.length,
    question: currentQuestion.question
  });
});

// POST /quiz - Submit answer for current question and move to next
router.post('/', (req, res) => {
  if (req.session.currentIndex === undefined) {
    return res.status(400).json({ error: "Quiz hasn't started yet. Go to GET /quiz first." });
  }

  const currentIndex = req.session.currentIndex;

  if (currentIndex >= triviaQuestions.length) {
    return res.status(400).json({ error: "Quiz is already completed. Check your score at GET /quiz/score" });
  }

  const { answer } = req.body;
  if (!answer) {
    return res.status(400).json({ error: "Please provide an answer in the request body." });
  }

  const correctAnswer = triviaQuestions[currentIndex].answer;
  const isCorrect = answer.trim().toLowerCase() === correctAnswer.toLowerCase();

  if (isCorrect) {
    req.session.score += 1;
  }

  // Advance to the next question
  req.session.currentIndex += 1;

  const isQuizOver = req.session.currentIndex >= triviaQuestions.length;

  res.status(200).json({
    result: isCorrect ? 'Correct!' : 'Incorrect!',
    correctAnswer: correctAnswer,
    quizFinished: isQuizOver,
    nextStep: isQuizOver ? 'GET /quiz/score' : 'GET /quiz for next question'
  });
});

// GET /quiz/score - Display user's final score
router.get('/score', (req, res) => {
  if (req.session.score === undefined) {
    return res.status(400).json({ error: "No score record found. Please play the quiz first." });
  }

  res.status(200).json({
    message: "Quiz Completed!",
    score: req.session.score,
    totalQuestions: triviaQuestions.length,
    restartUrl: "GET /quiz?restart=true"
  });
});

module.exports = router;