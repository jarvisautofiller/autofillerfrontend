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

const steps: Step[] = [
  { title: 'Upload Document', isActive: false, isCompleted: false },
  { title: 'Confirm Details', isActive: false, isCompleted: false },
  { title: 'Verification', isActive: false, isCompleted: false },
  { title: 'Complete', isActive: false, isCompleted: false },
];

const LeftPaneProgress: React.FC<Props> = ({ currentStep }) => {
  const updatedSteps = steps.map((step, index) => {
    const isActive = step.title.toLowerCase().includes(currentStep.toLowerCase());
    const isCompleted = steps.findIndex(s => s.title.toLowerCase().includes(currentStep.toLowerCase())) > index;
    return {
      ...step,
      isActive,
      isCompleted,
    };
  });

  return (
    <div className="left-pane">
      <h2>Verification Progress</h2>
      <ul className="step-list">
        {updatedSteps.map((step, index) => (
          <li
            key={index}
            className={`step-item ${step.isCompleted ? 'completed' : ''} ${step.isActive ? 'active' : ''}`}
          >
            <div className="step-circle">{step.isCompleted ? '✔' : index + 1}</div>
            <span className="step-title">{step.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftPaneProgress;
