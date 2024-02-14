/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import RedditData from './App';

// Mock axios get method to simulate API call
jest.mock('axios');

describe('RedditData component', () => {

  test('fetches and renders reddit data correctly', async () => {
    const mockData = {
      hot: {
        data: {
          children: [
            { data: { id: '1', permalink: '/r/FlutterDev/post1', title: 'Post 1', selftext: 'Post 1 text' } },
            { data: { id: '2', permalink: '/r/FlutterDev/post2', title: 'Post 2', selftext: 'Post 2 text' } }
          ]
        }
      }
    };

    axios.get.mockResolvedValue({ data: mockData });

    render(<RedditData />);

    await waitFor(() => {
      expect(screen.getByText('Reddit Data (/r/FlutterDev)')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Hot')).toBeInTheDocument();
      expect(screen.getByText('New')).toBeInTheDocument();
      expect(screen.getByText('Rising')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Post 1')).toBeInTheDocument();
      expect(screen.getByText('Post 2')).toBeInTheDocument();
      expect(screen.getByText('Post 1 text')).toBeInTheDocument();
      expect(screen.getByText('Post 2 text')).toBeInTheDocument();
    });
  });
});

