// ================================================
// EDUBRIDGE - Main Server File
// Node.js + Express REST API
// Digital Public Good | SDG 4: Quality Education
// ================================================

const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth',     require('./routes/auth'));
app.use('/api/courses',  require('./routes/courses'));
app.use('/api/quiz',     require('./routes/quiz'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/mentor',   require('./routes/mentor'));
app.use('/api/forum',    require('./routes/forum'));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'EduBridge API is running',
    version: '1.0.0',
    sdg: 'SDG 4 - Quality Education'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`EduBridge API running on port ${PORT}`);
});
