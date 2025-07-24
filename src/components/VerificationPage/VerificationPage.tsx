import React, { useState } from 'react';
import DocumentUpload from '../DocumentUpload/DocumentUpload';
import IDConfirmationSection from '../IDConfirmationSection/IDConfirmationSection';
import VerificationLoader from '../VerificationLoader/VerificationLoader';
import AutofillForm from '../AutofillForm/AutofillForm';
import Layout from '../Layout/Layout';
import LeftPaneProgress from '../LeftPaneProgress/LeftPaneProgress'
import './VerificationPage.css';

const VerificationPage: React.FC = () => {
  const [docId, setDocId] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [details, setDetails] = useState<any>(null);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'upload' | 'confirm' | 'verification' | 'form'>('upload');


  const handleIDConfirm = (id) => {
      setDocId(id);

    setConfirmed(true);
    setStep('verification');
    setTimeout(async () => {
        try {
      const res = await fetch(`https://jarvis-engine-595603232563.europe-west1.run.app/id?id=${id}`);
     if (res.ok) {
         const data = await res.json();
          if (data?.firstName) {
                 setDetails(data);
                 setStep('form');
                 setVerificationComplete(true);
               }
     } else {
         setStep('failedForm');
                 setVerificationComplete(false);
        }
    } catch (e) {
        setStep('failedForm');
        setVerificationComplete(false);
        };


    }, 10);
  };

  const handleExtractId = (id) => {
     setDocId(id);
     setStep('confirm');
  }

  return (
      <>
      <div className="verification-page">
        <LeftPaneProgress currentStep={step} />
        <div className="right-content">

    <Layout step={step}>

      {step === 'upload' && (
        <DocumentUpload onDocumentIdExtracted={(id) => handleExtractId(id)}  onManualEntry={(id) => handleIDConfirm(id)} />
      )}
      {step === 'confirm' && (
        <IDConfirmationSection docId={docId} onConfirm={() => handleIDConfirm(docId)} onReject={() => setStep('upload')} />
      )}
      {step === 'verification' && <VerificationLoader />}

    </Layout>
    </div>

    </div>
    <div className="verification-page">
    <AutofillForm userData={details} manual={verificationComplete} />
    </div>
    </>

  );
};

export default VerificationPage;
