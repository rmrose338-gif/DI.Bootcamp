const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.get('/questions', quizController.getAllQuestions);
router.post('/verify', quizController.verifyAnswer);

module.exports = router;