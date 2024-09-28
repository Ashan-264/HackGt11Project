const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Endpoint to summarize text
app.post('/summarize', async (req, res) => {
    const { chapterText } = req.body;

    try {
        const response = await axios.post(process.env.SUMMARIZATION_API_URL, { text: chapterText });
        res.json(response.data); // Assuming the API returns summarized parts
    } catch (error) {
        console.error('Error summarizing text:', error);
        res.status(500).json({ error: 'Failed to summarize text' });
    }
});

// Endpoint to generate images based on summarized text
app.post('/generate-image', async (req, res) => {
    const { textPart } = req.body;

    try {
        const response = await axios.post(process.env.DALLE_API_URL, { prompt: textPart });
        res.json(response.data); // Assuming the API returns the image URL
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: 'Failed to generate image' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
