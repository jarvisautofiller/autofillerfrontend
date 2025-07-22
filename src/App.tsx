import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DocumentUpload from './components/DocumentUpload/DocumentUpload';
import IDConfirmationModal from './components/IDConfirmationSection/IDConfirmationSection';
import VerificationLoader from './components/VerificationLoader/VerificationLoader';
import AutofillForm from './components/AutofillForm/AutofillForm';
import VerificationPage from './components/VerificationPage/VerificationPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <VerificationPage/>
    </>
  )
}

export default App;
