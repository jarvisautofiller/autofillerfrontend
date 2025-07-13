import styled from 'styled-components';

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: auto;
  height: 350px;
  align-items: center; 
`;


export const Container = styled.div`
  width: 100%;
  height: 1000px;
  
  background-image: url('.pic1.jpg') !important;
 
`;

export const LoginContainer = styled.div`
  width: 100vw%;
  height: 1000px;
  align-items: center;
  background-image: url('.pic1.jpg') !important;
 
`;
export const RightSideDiv = styled.div` text-align: right; `; 
export const FlexContainer = styled.div` display: flex; justify-content: flex-end; align-items: center; `;


export const SmallTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: auto;
  align-items: center !importa; 
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
  overflow-x: auto;
  overflow-y: auto;
  align-items: center; 
  
  th, td {
    padding: 1px;
    text-align: center;
    border: 1px solid #ddd;
  }
   input[type="number"] { 
  width: 100%; 
  }  
   input[type="text"] { 
  width: 100%; 
  }  

  
  @media (max-width: 600px) {
  
  input[type="number"] { 
  width: 100%; 
  font-size: 50%;
  }
  input[type="text"] { 
  width: 100%; 
  font-size: 50%;
  }

   
  }
`;

export const Button = styled.button` 
background-color: #FF9900;
 color: white; 
 padding: 10px 20px; 
 border: none; 
 border-radius: 5px;
cursor: pointer;
   &:hover {
    background-color: #FF990;
     } `;

     export const ButtonWrapper = styled.div` display: flex; justify-content: center; align-items: center; width: 100%; /* Adjust width as needed */ margin-top: 20px; /* Add some margin if needed */ `;     
     export const ButtonWrapperLeft = styled.div` display: flex; justify-content: left; align-items: center; width: 100%; /* Adjust width as needed */ margin-top: 20px; /* Add some margin if needed */ `;     
     export const ButtonWrapperRight = styled.div` display: flex; justify-content: right; align-items: center; width: 100%; /* Adjust width as needed */ margin-top: 20px; /* Add some margin if needed */ `;     


export const DarkLabel = styled.input.attrs({ type: 'text' })` 
background-color: #d3d3d3; /* Light grey background */
 border: 2px solid black; /* Light grey border */

`

export const HeadingStyled = styled.h2`
padding-top: 20px;
padding-bottom: 20px;
border: 2px solidrgb(26, 5, 5); /* Green border */
padding: 10px; /* Optional: Customize the padding */
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional: Add a subtle shadow */
  text-align: center;
  color: #4CAF50; /* Green color */
font-family: "Amazon Ember",Arial,sans-serif";
  margin: 20px 0; /* Optional: Customize the margin */
`;
