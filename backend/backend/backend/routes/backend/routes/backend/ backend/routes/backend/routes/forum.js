// ================================================
// FORUM ROUTES
// GET  /api/forum/posts     - Get all posts
// POST /api/forum/post      - Create new post
// POST /api/forum/reply     - Reply to a post
// ================================================

const express = require('express');
const router  = express.Router();

// GET all forum posts
router.get('/posts', async (req, res) => {
  try {
    // Query: SELECT * FROM forum_posts ORDER BY created_at DESC
    const posts = [
      { post_id: 1, title: 'How to solve quadratic equations?', author: 'Mary S.', category: 'Mathematics', replies: 12 },
      { post_id: 2, title: 'Best resources for learning Biology?', author: 'John D.', category: 'Science', replies: 8 },
      { post_id: 3, title: 'Tips for exam preparation', author: 'Aisha K.', category: 'General', replies: 21 }
    ];
    res.json({ posts: posts });
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve posts' });
  }
});

// POST create new forum post
router.post('/post', async (req, res) => {
  const { authorId, title, content, category } = req.body;
  try {
    // Query: INSERT INTO forum_posts (author_id, title, content, category)
    //        VALUES ($1, $2, $3, $4)
    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Could not create post' });
  }
});

module.exports = router;
