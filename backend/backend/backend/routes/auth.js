// ================================================
// AUTH ROUTES - Register and Login
// POST /api/auth/register
// POST /api/auth/login
// ================================================

const express = require('express');
const router  = express.Router();
const jwt     = require('jsonwebtoken');

// REGISTER - Create new student or mentor account
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // Step 1: Check if user already exists
    // Query: SELECT * FROM users WHERE email = $1
    
    // Step 2: Hash password for security
    // const hashedPassword = await bcrypt.hash(password, 10)
    
    // Step 3: Save new user to database
    // Query: INSERT INTO users (name, email, password, role)
    //        VALUES ($1, $2, $3, $4)
    
    // Step 4: Generate JWT token
    const token = jwt.sign(
      { userId: 1, role: role },
      process.env.JWT_SECRET || 'edubridge_secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Account created successfully',
      token: token
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// LOGIN - Authenticate existing user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Step 1: Find user by email
    // Query: SELECT * FROM users WHERE email = $1
    
    // Step 2: Compare password with stored hash
    // const isMatch = await bcrypt.compare(password, user.password)
    
    // Step 3: Generate JWT token
    const token = jwt.sign(
      { userId: 1, role: 'student' },
      process.env.JWT_SECRET || 'edubridge_secret',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token: token
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;
