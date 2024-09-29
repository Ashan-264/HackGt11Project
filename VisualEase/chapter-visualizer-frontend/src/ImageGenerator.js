import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ImageGenerator() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const generateImage = async () => {
      const response = await axios.post('http://localhost:5000/generate_image', { text });
      const imageData = await response.blob();
      setImage(URL.createObjectURL(imageData));
    };
    generateImage();
  }, [text]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleTextChange} />
      {image && <img src={image} alt="Generated Image" />}
    </div>
  );
}

export default ImageGenerator;
