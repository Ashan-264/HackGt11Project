import React, { useState } from 'react';
import styled from 'styled-components';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: #000;
  min-height: 100vh;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  background-color: #000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Section = styled.section`
  margin: 0 auto 40px auto;
  background-color: rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  padding: 20px;
  max-width: 1000px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 20px;
  color: #fff;
  font-size: 20px;
  font-weight: normal;
`;

const TextInput = styled.textarea`
  font-size: 16px;
  width: 100%;
  min-height: 100px;
  background-color: rgba(255, 255, 255, 0.06);
  border-radius: 5px;
  padding: 7px;
  color: white;
`;

const Button = styled.button`
  margin: 30px 10px 20px 10px;
  padding: 10px 30px;
  background: -webkit-linear-gradient(45deg, rgb(12, 116, 214), rgb(69, 132, 191));
  border: solid 1px rgba(204, 223, 234, 0.236);
  color: white;
  border-radius: 100px;
  font-size: 16px;
  transition: all 0.75s ease;
  cursor: pointer;

  &:hover {
    filter: brightness(130%);
  }
`;

const ScrTextChunker = () => {
  const [text, setText] = useState('');
  const [studyLevel, setStudyLevel] = useState('Beginner');
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerateTerms = async () => {
    setLoading(true);

    try {
      const prompt = `Extract uncommon terms and definitions from the following text for a ${studyLevel} student: ${text}`;
      
      const response = await axios.post(
        'https://api.groq.com/v1/your_endpoint',  // Replace with the correct endpoint
        {
          messages: [{ role: "user", content: prompt }],
          model: "llama3-70b-8192"
        },
        {
          headers: {
            'Authorization': `Bearer YOUR_GROQ_API_KEY`,
            'Content-Type': 'application/json'
          }
        }
      );

      const result = response.data.choices[0].message.content;

      const parsedTerms = result
        .split(/\n\d+\.\s/)
        .filter(entry => entry.trim() !== '')
        .map(entry => {
          const match = entry.match(/^\*\*(.*?)\*\*:\s(.*)$/);
          if (match) {
            return { termName: match[1].trim(), definition: match[2].trim() };
          }
          return null;
        })
        .filter(item => item !== null);

      setTerms(parsedTerms);
    } catch (error) {
      console.error('Error generating terms:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1>Term Finder</h1>
      <ContentWrapper>
        <Section>
          <SectionTitle>Input Text</SectionTitle>
          <TextInput
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter or paste your text here..."
          />
          <SectionTitle>Study Level</SectionTitle>
          <TextInput
            value={studyLevel}
            onChange={(e) => setStudyLevel(e.target.value)}
            placeholder="Enter study level (e.g., undergraduate, graduate)"
          />
          <Button onClick={handleGenerateTerms} disabled={loading || !text || !studyLevel}>
            {loading ? 'Generating...' : 'Generate Terms'}
          </Button>
        </Section>
        {/* Terms Display Section */}
        <Section>
          <SectionTitle>Generated Terms & Definitions</SectionTitle>
          {terms.length > 0 && (
            <div>
              {terms.map((term, index) => (
                <div key={index}>
                  <strong>{term.termName}:</strong> {term.definition}
                </div>
              ))}
            </div>
          )}
        </Section>
      </ContentWrapper>
    </Container>
  );
};

export default ScrTextChunker;
