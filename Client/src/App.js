import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './Pages/navbar';
import TermDef from './Pages/termDef';  // Ensure this is correctly pointed to your updated TermDef.jsx
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
    const [terms, setTerms] = useState([]);  // New state for storing terms

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const handleTextSubmit = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/summarize`, { chapterText: textInput });
        const parts = response.data;
        setSummaries(parts);

        parts.forEach(async (part, index) => {
            const imageResponse = await axios.post(`${API_BASE_URL}/api/generate-image`, { textPart: part });
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
                    <Route 
                        path="/Text Chunker" 
                        element={<ScrTextChunker setTerms={setTerms} />}  // Pass setTerms to ScrTextChunker
                    />
                    <Route 
                        path="/FlashCards" 
                        element={<FlashCards terms={terms} />}  // Pass terms to FlashCards
                    />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </Router>
        </div>
    );
}

export default App;
