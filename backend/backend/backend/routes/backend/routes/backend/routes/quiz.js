// ================================================
// QUIZ ROUTES
// GET  /api/quiz/:id    - Get quiz questions
// POST /api/quiz/submit - Submit answers + grade
// ================================================

const express = require('express');
const router  = express.Router();

// GET quiz by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Query: SELECT * FROM quizzes WHERE quiz_id = $1
    res.json({
      quiz_id: id,
      title: 'Algebra Quiz',
      time_limit: 20,
      questions: [
        {
          question_number: 1,
          question: 'What is the value of x in 2x + 5 = 15?',
          options: ['A. x = 3', 'B. x = 5', 'C. x = 7', 'D. x = 10'],
          correct_answer: 'B'
        }
      ]
    });
  } catch (error) {
    res.status(404).json({ error: 'Quiz not found' });
  }
});

// POST submit quiz answers and get score
router.post('/submit', async (req, res) => {
  const { studentId, quizId, answers } = req.body;
  try {
    // Step 1: Get correct answers from database
    // Query: SELECT questions FROM quizzes WHERE quiz_id = $1

    // Step 2: Grade the answers
    const totalQuestions = 10;
    const correctAnswers = 8;
    const scorePercent   = (correctAnswers / totalQuestions) * 100;

    // Step 3: Save result to database
    // Query: INSERT INTO quiz_results (student_id, quiz_id, score, percentage)
    //        VALUES ($1, $2, $3, $4)

    // Step 4: Update progress table
    // Query: UPDATE progress SET completion_status = 'completed'
    //        WHERE student_id = $1 AND material_id = $2

    res.json({
      message:       'Quiz submitted successfully',
      score:         correctAnswers,
      total:         totalQuestions,
      percentage:    scorePercent,
      passed:        scorePercent >= 50,
      xp_earned:     10
    });
  } catch (error) {
    res.status(500).json({ error: 'Quiz submission failed' });
  }
});

module.exports = router;
