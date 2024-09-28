import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './Pages/navbar';
import TermDef from './Pages/termDef';
import ScrTextChunker from "./Pages/ScrTextChunker";
import FlashCards from './Pages/FlashCards';
import About from "./Pages/about";
import Home from "./Pages/home";

import AOS from "aos";
import "aos/dist/aos.css";


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

    useEffect(() => {
        setTimeout(() => {
          AOS.init();
        }, 120);
        AOS.refresh();
      }, []); // a library for transitions

    return (
        <div>
            <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/TermDef" element={<TermDef />} />
                    <Route path="/Text Chunker" element={<ScrTextChunker />} />
                    <Route path="/FlashCards" element={<FlashCards />} />
                    <Route path="/about" element={<About />} />
                </Routes>
                    
            </div>
        </Router>
        </div>
        
    );
}

export default App;
