import React, { useState } from 'react';
import axios from 'axios';

const TermDef = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const generateImage = async () => {
    if (!prompt) {
      alert('Please enter a prompt.');
      return;
    }

    try {
      // Replace this URL with the direct Hugging Face model endpoint if available
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell',
        {
          inputs: prompt,
          options: {
            seed: 0,
            randomize_seed: true,
            width: 1024,
            height: 1024,
            num_inference_steps: 4
          }
        },
        {
          headers: {
            'Authorization': `Bearer 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`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Assuming the API returns an image URL
      const imagePath = response.data?.path || '';
      setImageUrl(imagePath);

    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again later.');
    }
  };

  return (
    <div>
      <input 
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter text for image generation"
      />
      <button onClick={generateImage}>Generate Image</button>
      {imageUrl && <img src={imageUrl} alt="Generated" style={{ width: '100%' }} />}
    </div>
  );
};

export default TermDef;
