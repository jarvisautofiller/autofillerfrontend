import React, { useEffect, useState } from 'react';
import './VerificationLoader.css';

const VerificationLoader: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    'Fetching data from government database...',
    'You will receive a call on your registered mobile number for verification.'
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessageIndex((prev) => Math.min(prev + 1, messages.length - 1));
    }, 3000);

    return () => clearTimeout(timer);
  }, [messageIndex]);

  return (
    <div className="loader-message">
      <p>{messages[messageIndex]}</p>
    </div>
  );
};

export default VerificationLoader;
