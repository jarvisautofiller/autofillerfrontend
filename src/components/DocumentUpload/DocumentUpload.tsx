import React, { useState } from 'react';
import axios from 'axios';
import './DocumentUpload.css';
import LoaderOverlay from '../LoaderOverlay/LoaderOverlay';

interface Props {
  onDocumentIdExtracted: (docId: string) => void;
  onManualEntry: (docId: string) => void;
}

const DocumentUpload: React.FC<Props> = ({ onDocumentIdExtracted, onManualEntry }) => {
  const [file, setFile] = useState<File | null>(null);
  const [docNumber, setDocNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    setError('');
  };

  const handleUpload = async () => {
      setLoading(true);
    if (!file) {
      setError('Please select a document.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post(
        'https://jarvis-engine-595603232563.europe-west1.run.app/document',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (res.data) {
        onDocumentIdExtracted(res.data);
      } else {
        setError('There was an error while processing your image. Please enter your document ID manually or re-upload your document');
      }
    } catch (err) {
       setError('There was an error while processing your image. Please enter your document ID manually or re-upload your document');
    }
setLoading(false);
  };

  return (
      <>


    <div className="upload-card" style={{ position: 'relative' }}>
    {loading && <LoaderOverlay/>}
      <div className="upload-header">
        <div className="upload-icon">
          <img src="id-verify-illustration.png" alt="ID Verification" className="id-verify-image"/>
        </div>
        <div className="upload-header-div">
          <h2>Verify Your Identity</h2>
          <p>Upload your document or enter ID manually to start verification.</p>
        </div>
      </div>
{error && <p className="error-text">{error}</p>}
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

 <button className="upload-btn" onClick={handleUpload}>Submit</button>

      <div className="divider">OR</div>

      <div className="manual-entry">
        <label>Enter Document Number</label>
        <input
          type="text"
          value={docNumber}
          placeholder="XXXXXXXXXXXX"
          onChange={(e) => setDocNumber(e.target.value)}
        />
        <button className="upload-btn" onClick={() => onManualEntry(docNumber)}>
          Continue
        </button>
      </div>


    </div></>
  );
};

export default DocumentUpload;
