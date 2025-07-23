import React from 'react';
import './LeftPaneProgress.css';

interface Step {
  title: string;
  isActive: boolean;
  isCompleted: boolean;
}

interface Props {
  currentStep: string;
}


const steps: { id: string; title: string }[] = [
  { id: 'upload', title: 'Upload Document' },
  { id: 'confirm', title: 'Confirm Details' },
  { id: 'verify', title: 'Verification' },
  { id: 'form', title: 'Complete' },
];

const LeftPaneProgress: React.FC<Props> = ({ currentStep }) => {
  const failedVerify = currentStep === 'failedForm';
  const currentIndex = steps.findIndex(step => step.id === (failedVerify ? 'form' : currentStep));

  return (
    <div className="left-pane">
      <h2>Verification Progress</h2>
      <ul className="step-list">
        {steps.map((step, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;

          // Show red cross if it's the Verification step and failed
          const isFailed = failedVerify && step.id === 'verify';

          return (
            <li
              key={index}
              className={`step-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''} ${isFailed ? 'failed' : ''}`}
            >
              <div className="step-circle">
                {isFailed ? 'X' : isCompleted ? '✔' : index + 1}
              </div>
              <span className="step-title">{step.title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};



export default LeftPaneProgress;
