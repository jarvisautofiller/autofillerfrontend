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
  const [step, setStep] = useState<'upload' | 'confirm' | 'verify' | 'form'>('upload');


  const handleIDConfirm = (id) => {
      setDocId(id);
    setConfirmed(true);
    setStep('verify');
    setTimeout(async () => {
      const res = await fetch(`https://jarvis-engine-614442955083.europe-west1.run.app/id?id=${docId}`);
      const data = await res.json();
      if (data?.name) {
        setDetails(data);
        setStep('form');
        setVerificationComplete(true);
      } else {
        setStep('form');
        setVerificationComplete(false);
      }
    }, 3000);
  };

  return (
      <>
      <div className="verification-page">
        <LeftPaneProgress currentStep={step} />
        <div className="right-content">

    <Layout step={step}>

      {step === 'upload' && (
        <DocumentUpload onDocumentIdExtracted={(id) => {handleIDConfirm(id)} }onManualEntry={(id) => { handleIDConfirm(id)}} />
      )}
      {step === 'confirm' && (
        <IDConfirmationSection docId={docId} onConfirm={handleIDConfirm(id)} onReject={() => setStep('upload')} />
      )}
      {step === 'verify' && <VerificationLoader />}

    </Layout>
    </div>

    </div>
    <div className="verification-page">
    <AutofillForm data={details} verified={verificationComplete} />
    </div>
    </>

  );
};

export default VerificationPage;
