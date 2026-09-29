const pool = require('../config/db');

// GET /api/quiz/questions - Fetch all questions with options (without revealing correct answers)
exports.getAllQuestions = async (req, res) => {
  try {
    const queryText = `
      SELECT q.id, q.question, 
             COALESCE(json_agg(o.option) FILTER (WHERE o.option IS NOT NULL), '[]') AS options
      FROM questions q
      LEFT JOIN questions_options qo ON q.id = qo.question_id
      LEFT JOIN options o ON qo.option_id = o.id
      GROUP BY q.id
      ORDER BY q.id ASC;
    `;
    const result = await pool.query(queryText);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve quiz questions' });
  }
};

// POST /api/quiz/verify - Submit an answer for feedback
exports.verifyAnswer = async (req, res) => {
  const { questionId, selectedOption } = req.body;

  if (!questionId || !selectedOption) {
    return res.status(400).json({ error: 'questionId and selectedOption are required' });
  }

  try {
    const result = await pool.query('SELECT correct_answer FROM questions WHERE id = $1', [questionId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Question not found' });
    }

    const correctAnswer = result.rows[0].correct_answer;
    const isCorrect = correctAnswer.trim().toLowerCase() === selectedOption.trim().toLowerCase();

    res.status(200).json({
      isCorrect,
      correctAnswer
    });
  } catch (err) {
    res.status(500).json({ error: 'Error verifying answer' });
  }
};