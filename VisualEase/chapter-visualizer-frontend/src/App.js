import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [textInput, setTextInput] = useState('');
    const [summaries, setSummaries] = useState([]);
    const [images, setImages] = useState({});

    const handleTextSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/summarize', { chapterText: textInput });
            const parts = response.data; // Assuming response is an array of summarized parts
            setSummaries(parts);

            // Generate images for each summary
            parts.forEach(async (part, index) => {
                const imageResponse = await axios.post('http://localhost:5000/generate-image', { textPart: part });
                setImages(prevImages => ({ ...prevImages, [index]: imageResponse.data.imageUrl }));
            });
        } catch (error) {
            console.error('Error processing text:', error);
        }
    };

    return (
        <div>
            <h1>Chapter Visualizer</h1>
            <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Enter chapter text here..."
            />
            <button onClick={handleTextSubmit}>Submit</button>

            <div>
                {summaries.map((summary, index) => (
                    <div key={index}>
                        <p>{summary}</p>
                        {images[index] && <img src={images[index]} alt={`Illustration for ${summary}`} />}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
