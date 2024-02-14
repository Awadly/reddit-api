import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Card from './Card';

function RedditData() {
  const [redditData, setRedditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('hot');

  useEffect(() => {
    fetchData(selectedCategory);
  }, [selectedCategory]);

  const fetchData = async (category) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://192.168.1.15:3001/redditData?category=${category}`);
      setRedditData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return(   
    <div className="loading-container">
      <div className="reddit-loading"></div>
    </div>);
  }

  return (
    <div>
      <h2>Reddit Data (/r/FlutterDev)</h2>
      <div className='button-container'>
        <button className={selectedCategory === 'hot' ? 'button active' : 'button'} onClick={() => handleCategoryChange('hot')}>Hot</button>
        <button className={selectedCategory === 'new' ? 'button active' : 'button'} onClick={() => handleCategoryChange('new')}>New</button>
        <button className={selectedCategory === 'rising' ? 'button active' : 'button'} onClick={() => handleCategoryChange('rising')}>Rising</button>
      </div>
      {Object.entries(redditData).map(([category, data]) => (
          <ul>
            {redditData[selectedCategory].data.children.map(post => (
              <Card
                key={post.data.id}
                link={`https://www.reddit.com${post.data.permalink}`}
                title={post.data.title}
                text={post.data.selftext}
              />
            ))}
          </ul>
      ))}
    </div>
  );
}

export default RedditData;