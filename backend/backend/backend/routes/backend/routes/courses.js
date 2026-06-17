// ================================================
// COURSE ROUTES
// GET  /api/courses        - Get all courses
// GET  /api/courses/:id    - Get one course
// POST /api/courses/enroll - Enroll in course
// ================================================

const express = require('express');
const router  = express.Router();

// GET all courses
router.get('/', async (req, res) => {
  try {
    // Query: SELECT * FROM courses WHERE is_published = true
    const courses = [
      { course_id: 1, title: 'Mathematics Grade 10', subject: 'Mathematics', grade_level: 'Grade 10' },
      { course_id: 2, title: 'English Language Grade 10', subject: 'English', grade_level: 'Grade 10' },
      { course_id: 3, title: 'Science Grade 10', subject: 'Science', grade_level: 'Grade 10' }
    ];
    res.json({ courses: courses });
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve courses' });
  }
});

// GET single course by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Query: SELECT * FROM courses WHERE course_id = $1
    res.json({ course_id: id, title: 'Mathematics Grade 10', lessons: [] });
  } catch (error) {
    res.status(404).json({ error: 'Course not found' });
  }
});

// POST enroll student in course
router.post('/:id/enroll', async (req, res) => {
  const { id }       = req.params;
  const { studentId } = req.body;
  try {
    // Query: INSERT INTO enrollments (student_id, course_id)
    //        VALUES ($1, $2)
    res.json({ message: 'Enrolled successfully', courseId: id });
  } catch (error) {
    res.status(500).json({ error: 'Enrollment failed' });
  }
});

module.exports = router;
