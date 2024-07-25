

const express = require('express');
const { fetchPosts, fetchPhotosForPost } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  const { start, limit } = req.query;
  try {
    const posts = await fetchPosts({ start: parseInt(start), limit: parseInt(limit) });
    
    const postsWithImages = await Promise.all(
      posts.map(async (post) => {
        const photos = await fetchPhotosForPost(post.id);
        const user = await fetchUserById(post.userId);
        const userInitials = user.name
          .split(' ')
          .map(name => name.charAt(0))
          .join('');
        return {
          ...post,

          images: [
                      { url: 'https://picsum.photos/200/300' },
                      { url: 'https://picsum.photos/200/300' },
                      { url: 'https://picsum.photos/200/300' },
                    ],
                    
                    user: {
                      initials: userInitials,
                      name: user.name,
                      email: user.email,
                    },
        };
      })
    );

    res.json(postsWithImages);
  } catch (error) {
    console.error('Error fetching posts with images:', error);
    res.status(500).json({ error: 'Failed to fetch posts with images' });
  }
});

module.exports = router;
