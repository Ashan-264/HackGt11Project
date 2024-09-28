import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: #f4f4f4;
  min-height: 100vh;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
`;

const TextInput = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 100%;
  max-width: 100%;
  min-height: 100px;
`;

const LevelInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 100%;
  max-width: 100%;
  margin-top: 20px;
`;

const TermsTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;  // Two columns, one for terms and one for definitions
  gap: 15px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
`;

const TableHeader = styled.div`
  font-weight: bold;
  text-align: centre;
`;

const TermItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #e9e9e9;

  &:last-child {
    border-bottom: none;
  }
`;

const TermText = styled.span`
  color: #333;
  font-weight: bold;
`;

const DefinitionText = styled.span`
  color: #333;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 15px 25px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ExportButton = styled(Button)`
  background-color: #28a745;

  &:hover {
    background-color: #218838;
  }
`;

const ScrTextChunker = () => {
  const [text, setText] = useState('');
  const [studyLevel, setStudyLevel] = useState('Beginner');  // State for study level
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerateTerms = async () => {
    setLoading(true);

    console.log("Input text:", text);
    console.log("Study level:", studyLevel);  // Log the study level

    try {
      const response = await fetch('http://localhost:5001/extract_terms', {  // Directly call Flask backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, level: studyLevel })
      });

      console.log("Request body:", { text, level: studyLevel });

      const data = await response.json();

      console.log("Response data:", data);

      // Parse the returned string into individual terms and definitions
      const parsedTerms = data.terms_and_definitions
        .split(/\n\d+\.\s/)  // Split based on the numbered list pattern
        .filter(entry => entry.trim() !== '')  // Remove empty entries
        .map(entry => {
          const match = entry.match(/^\*\*(.*?)\*\*:\s(.*)$/);
          if (match) {
            return { termName: match[1].trim(), definition: match[2].trim() };
          } else {
            return null;
          }
        })
        .filter(item => item !== null);

      if (parsedTerms.length === 0) {
        console.warn("No terms were parsed.");
        alert("No terms could be extracted. Please check the input and try again.");
      }

      setTerms(parsedTerms);
    } catch (error) {
      console.error("Error generating terms:", error);
    }
    setLoading(false);
  };

  return (
    <Container>
      <ContentWrapper>
        <Section>
          <SectionTitle>Input Text</SectionTitle>
          <TextInput
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter or paste your text here..."
          />

          <SectionTitle>Study Level</SectionTitle>  {/* Add a title for the study level input */}
          <LevelInput
            type="text"
            value={studyLevel}
            onChange={(e) => setStudyLevel(e.target.value)}
            placeholder="Enter study level (e.g., undergraduate, graduate, expert)"
          />
          
          <Button onClick={handleGenerateTerms} disabled={loading || !text || !studyLevel}>
            {loading ? "Generating..." : "Generate Terms"}
          </Button>
        </Section>

        <Section>
          <SectionTitle>Generated Terms & Definitions</SectionTitle>
          <TermsTable>
            <TableHeader>Term</TableHeader>
            <TableHeader>Definition</TableHeader>
            {terms.map((term, index) => (
              <React.Fragment key={index}>
                <TermItem>
                  <TermText>{term.termName}</TermText>
                </TermItem>
                <TermItem>
                  <DefinitionText>{term.definition}</DefinitionText>
                </TermItem>
              </React.Fragment>
            ))}
          </TermsTable>
        </Section>

        <Button>Generate Images</Button>
        <ExportButton>Export File</ExportButton>
        
      </ContentWrapper>
    </Container>
  );
};

export default ScrTextChunker;
