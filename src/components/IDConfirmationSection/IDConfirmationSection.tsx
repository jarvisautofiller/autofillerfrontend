import React from 'react';
import './IDConfirmationSection.css';

interface Props {
  docId: string;
  onConfirm: () => void;
  onReject: () => void;
}

const IDConfirmationSection: React.FC<Props> = ({ docId, onConfirm, onReject }) => {
  return (
    <div className="id-confirmation-container">
      <h2 className="id-confirmation-title">Please confirm your document ID</h2>
      <div className="id-display-box">{docId}</div>
      <div className="confirm-actions">
        {docId != 'Please enter your document ID manually.' && <button className="upload-btn" onClick={onConfirm}>Confirm</button>}
        <button className="upload-btn reject-btn" onClick={onReject}>Try Again</button>
      </div>
    </div>
  );
};

export default IDConfirmationSection;
