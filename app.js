const axios = require('axios');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

async function fetchDataFromReddit(subreddit, category) {
  try {
    const response = await axios.get(`https://www.reddit.com/r/${subreddit}/${category}.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Reddit API:', error);
    throw error;
  }
}

const subreddit = 'FlutterDev';
const categories = ['hot', 'new', 'rising'];

categories.forEach(async (category) => {
  try {
    const redditData = await fetchDataFromReddit(subreddit, category);
    console.log(redditData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
