import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making API calls
import "./termDef.css"

export default function termDef() {

  document.title = "Term Visualizer - VisualEase";

  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [analogy, setAnalogy] = useState('');
  const [image, setImage] = useState(null);

  const addAnalogyBox = () => {
    var analogyBox = document.getElementById("analogyBox");
    var paragraph = document.getElementById("description");
    analogyBox.classList.add("active");
    paragraph.innerText = "Generate an image of your term and definition.";
  };

  const removeAnalogyBox = () => {
    var analogyBox = document.getElementById("analogyBox");
    var paragraph = document.getElementById("description");
    analogyBox.classList.remove("active");
    paragraph.innerText = "Generate an analogy image of your term and definition.";
  };

  const handleGenerateImage = async () => {
    try {
      const response = await axios.post('http://localhost:5000/generate-image', {
        text: `${term} - ${definition}`,
      });
      const imageData = await response.blob();
      setImage(URL.createObjectURL(imageData));
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'term') {
      setTerm(e.target.value);
    } else if (e.target.name === 'definition') {
      setDefinition(e.target.value);
    } else if (e.target.name === 'analogy') {
      setAnalogy(e.target.value);
    }
  };

  return (
    <div className="pageContainerContainer">
      <div className="pageContainer">
        <h1 className="title">Term Visualizer</h1>
        <p className="subTitle">Use our term visualizer to create images that represent your study terms or create analogies to remember term definitions.</p>
        <div className="container" data-aos="fade-up">
          <div className="container1">
            <p style={{ marginTop: '0px' }}>Input Term</p>
            <textarea
              name="term"
              placeholder="e.g., Mitochondria"
              value={term}
              onChange={handleInputChange}
            />
            <p>Input Definition</p>
            <textarea
              name="definition"
              style={{ height: '140px' }}
              placeholder="e.g., The powerhouse of a cell."
              value={definition}
              onChange={handleInputChange}
            />
          </div>
          <div className="container2">
            <form action="/action_page.php">
              <p style={{ marginTop: '0px' }}>Generation Type</p>
              <input
                type="radio"
                name="genType"
                value="image"
                id="image"
                onChange={addAnalogyBox}
                required
              />
              <label style={{ marginLeft: '5px' }} for="image">Image</label><br />
              <input
                type="radio"
                name="genType"
                value="analogy"
                onChange={removeAnalogyBox}
                required
              />
              <label style={{ marginLeft: '5px' }} for="analogy">Analogy</label>
              <p id="description"></p>
              <div id="analogyBox" className="active">
                <p>Analogy Box</p>
                <textarea
                  name="analogy"
                  style={{ height: '120px' }}
                  placeholder="e.g., Compare the mitochondria to a part of the human body."
                  value={analogy}
                  onChange={handleInputChange}
                />
              </div>

            </form>

          </div>

        </div>
        <button className="generate" onClick={handleGenerateImage}>Generate Image</button>
        {image && <img src={image} alt="Generated Image" />}
      </div>
    </div>
  )
}
