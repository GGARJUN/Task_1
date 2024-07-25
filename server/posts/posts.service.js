const axios = require('axios');

async function fetchPosts(params) {
  const { start = 0, limit = 6 } = params || {};
  
  const { data: posts } = await axios.get(
    'https://jsonplaceholder.typicode.com/posts?limit',
    {
            params: {
              _start: start,
              _limit: limit,
            },
          },
        );
    return posts;
  } 


async function fetchPhotosForPost(postid) {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${postid}/photos`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching photos for post ${postid}:`, error);
    throw error;
  }
}

module.exports = {
  fetchPosts,
  fetchPhotosForPost,
};
