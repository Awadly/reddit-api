const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

const axios = require('axios');
const express = require('express');
const cors = require('cors'); 
const app = express();
const PORT = process.env.PORT || 3001;

const firebaseConfig = {
  apiKey: "AIzaSyC14iAjplAH20dyv20YHZnBYABRtZ0sVns",
  authDomain: "reddit-798a9.firebaseapp.com",
  projectId: "reddit-798a9",
  storageBucket: "reddit-798a9.appspot.com",
  messagingSenderId: "908044392891",
  appId: "1:908044392891:web:15dfeced4c497bec4a4c9e",
  measurementId: "G-0G3CB36GCK"
};

const Fireapp = initializeApp(firebaseConfig);
const db = getFirestore(Fireapp);

app.use(cors()); 
app.get('/redditData', async (req, res) => { 
  const subreddit = 'FlutterDev';
  const categories = ['hot', 'new', 'rising'];
  const redditData = {};

  try {
    for (const category of categories) {
      const response = await axios.get(`https://www.reddit.com/r/${subreddit}/${category}.json`);
      redditData[category] = response.data;

      // Store data in Firestore
      await addDoc(collection(db, "redditData"), {
        category: category,
        data: response.data
      });
    }
    res.json(redditData);
  } catch (error) {
    console.error('Error fetching data from Reddit API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
