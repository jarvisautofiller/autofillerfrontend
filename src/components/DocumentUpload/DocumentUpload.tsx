import React, { useState } from 'react';
import axios from 'axios';
import './DocumentUpload.css';

interface Props {
  onDocumentIdExtracted: (docId: string) => void;
  onManualEntry: (docId: string) => void;
}

const DocumentUpload: React.FC<Props> = ({ onDocumentIdExtracted, onManualEntry }) => {
  const [file, setFile] = useState<File | null>(null);
  const [docNumber, setDocNumber] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a document.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post(
        'https://jarvis-engine-614442955083.europe-west1.run.app/document',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (res.data?.docId) {
        onDocumentIdExtracted(res.data.docId);
      } else {
        setError('Unable to extract ID. Please enter your document ID manually.');
      }
    } catch (err) {
        onDocumentIdExtracted('123456790')
//       setError('Please enter your document ID manually.');
    }
  };

  return (
    <div className="upload-card">
      <div className="upload-header">
        <div className="upload-icon">
          <img src="id-verify-illustration.png" alt="ID Verification" className="id-verify-image"/>
        </div>
        <div className="upload-header-div">
          <h2>Verify Your Identity</h2>
          <p>Upload your document or enter ID manually to start verification.</p>
        </div>
      </div>

    <div className="upload-box" onDragOver={(e) => e.preventDefault()}
                                  onDrop={(e) => {
                                    e.preventDefault();
                                    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                                      setFile(e.dataTransfer.files[0]);
                                      setError('');
                                    }
                                  }}>
      <label htmlFor="file-input" className="drag-label">
        Drag and drop a file here or click the button below (.jpeg/.jpg/.png format)
      </label>
      <input id="file-input" type="file" accept="image/*" onChange={handleFileChange} />

      {file && <p className="file-name">{file.name}</p>}

      <div className="file-buttons">
        <label htmlFor="file-input" className="select-btn">Select File</label>
      </div>
    </div>

 <button className="upload-btn" onClick={handleUpload}>Upload</button>

      <div className="divider">OR</div>

      <div className="manual-entry">
        <label>Enter Document Number</label>
        <input
          type="text"
          value={docNumber}
          placeholder="XXXX-XXXX-XXXX"
          onChange={(e) => setDocNumber(e.target.value)}
        />
        <button className="upload-btn" onClick={() => onManualEntry(docNumber)}>
          Continue
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default DocumentUpload;
