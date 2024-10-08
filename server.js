// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { Client } = require('gradio_client'); // Adjust based on the actual npm package
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const saveDirectory = path.join(__dirname, 'generated_images');

// Middleware setup
app.use(cors({ origin: 'http://localhost:3000' })); // Adjust for your Vercel domain after deployment
app.use(express.json());

// Ensure the save directory exists
if (!fs.existsSync(saveDirectory)) {
    fs.mkdirSync(saveDirectory);
}

// Initialize Gradio client (replace the Flask-based one)
const hf_token = process.env.HF_TOKEN;
const client = new Client("black-forest-labs/FLUX.1-schnell", hf_token);

// Image generation endpoint
app.post('/api/generate-image', async (req, res) => {
    const { textPart: prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const result = await client.predict({
            prompt,
            seed: 0,
            randomize_seed: true,
            width: 1024,
            height: 1024,
            num_inference_steps: 4,
            api_name: "/infer"
        });

        const [imagePath] = result;
        const savePath = path.join(saveDirectory, 'generated_image.webp');

        // Copy the image to the save directory
        fs.copyFileSync(imagePath, savePath);

        return res.json({ imageUrl: `/generated_images/generated_image.webp` });
    } catch (error) {
        console.error('Error generating image:', error);
        return res.status(500).json({ error: error.message });
    }
});

// Serve static images
app.use('/generated_images', express.static(saveDirectory));

// Term extraction endpoint (similar to the Flask version)
app.post('/api/extract_terms', async (req, res) => {
    const { text, level } = req.body;

    if (!text || !level) {
        return res.status(400).json({ error: 'Text and study level are required' });
    }

    try {
        const prompt = `Extract uncommon terms and definitions from the following text for a ${level} student: ${text}`;
        const response = await client.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama3-70b-8192"
        });

        const result = response.choices[0].message.content;
        return res.json({ terms_and_definitions: result });
    } catch (error) {
        console.error('Error extracting terms:', error);
        return res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
