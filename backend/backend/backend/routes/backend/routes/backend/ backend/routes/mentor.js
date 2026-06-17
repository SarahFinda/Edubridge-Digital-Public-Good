// ================================================
// MENTOR ROUTES
// GET  /api/mentor          - Get all mentors
// POST /api/mentor/request  - Request a mentor
// PUT  /api/mentor/respond  - Accept or reject
// ================================================

const express = require('express');
const router  = express.Router();

// GET all available mentors
router.get('/', async (req, res) => {
  try {
    // Query: SELECT * FROM users WHERE role = 'mentor'
    const mentors = [
      { mentor_id: 1, name: 'Mr. James Koroma', subject: 'Mathematics', rating: 4.9, available: true },
      { mentor_id: 2, name: 'Ms. Fatima Bangura', subject: 'Science', rating: 4.8, available: true },
      { mentor_id: 3, name: 'Dr. Amina Hassan', subject: 'ICT', rating: 4.9, available: false }
    ];
    res.json({ mentors: mentors });
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve mentors' });
  }
});

// POST request a mentor
router.post('/request', async (req, res) => {
  const { studentId, mentorId, subject } = req.body;
  try {
    // Query: INSERT INTO mentorship (student_id, mentor_id, subject, status)
    //        VALUES ($1, $2, $3, 'pending')
    res.json({ message: 'Mentor request sent successfully', status: 'pending' });
  } catch (error) {
    res.status(500).json({ error: 'Request failed' });
  }
});

module.exports = router;
