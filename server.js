const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

const API_URL = 'https://newsapi.org/v2/top-headlines';
const API_KEY = '47e2d0eaaf1a4128a7ff6acff2fb9ae8'; // Replace with your actual News API key

app.use(cors());

app.get('/news', async (req, res) => {
    const region = req.query.region || 'us';
    const category = req.query.category || '';
    
    try {
        const response = await axios.get(API_URL, {
            params: {
                country: region,
                category: category,
                apiKey: API_KEY
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
