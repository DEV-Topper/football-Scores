import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_URL = 'https://api.football-data.org/v4';
const API_KEY = process.env.FOOTBALL_DATA_API_KEY;

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log('API route called with method:', req.method);
  console.log(API_KEY);
  
  // if (req.method !== 'GET') {
  //   return res.status(405).json({ error: 'Method Not Allowed' });
  // }

  if (!API_KEY) {
    console.error('FOOTBALL_DATA_API_KEY is not set');
    return res.status(500).json({ error: 'API key is not configured' });
  }

  try {
    console.log('Fetching live scores...');
    const response = await axios.get(`${API_URL}/matches`, {
      headers: {
        'X-Auth-Token': API_KEY,
      },
    });

    

    console.log('Football-Data API response status:', response.status);
    console.log('Football-Data API response headers:', response.headers);
    console.log('Football-Data API response data:', JSON.stringify(response.data).slice(0, 200) + '...');

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Error fetching live scores:', error.message);
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response?.data);
      res.status(error.response?.status || 500).json({ 
        error: 'Failed to fetch live scores', 
        details: error.response?.data 
      });
    } else {
      res.status(500).json({ error: 'Failed to fetch live scores' });
    }
  }
}