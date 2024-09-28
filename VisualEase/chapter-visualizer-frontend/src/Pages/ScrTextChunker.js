import React from 'react';
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

const InputFile = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 100%;
  max-width: 400px;
`;

const TermsList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
`;

const TermItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e9e9e9;
`;

const TermText = styled.span`
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

const App = () => {
  return (
    <Container>
      <ContentWrapper>
        <Section>
          <SectionTitle>Input File</SectionTitle>
          <InputFile type="file" />
        </Section>

        <Section>
          <SectionTitle>Generated Terms & Definitions</SectionTitle>
          <TermsList>
            {/* This is where the terms and definitions will be mapped */}
            <TermItem>
              <TermText>A</TermText>
              <TermText>Definition</TermText>
            </TermItem>
            <TermItem>
              <TermText>B</TermText>
              <TermText>Definition</TermText>
            </TermItem>
            <TermItem>
              <TermText>C</TermText>
              <TermText>Definition</TermText>
            </TermItem>
          </TermsList>
        </Section>

        <Button>Generate Images</Button>
        <ExportButton>Export File</ExportButton>
      </ContentWrapper>
    </Container>
  );
};

export default App;
