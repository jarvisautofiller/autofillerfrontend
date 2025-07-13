import React, { useEffect } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';

const UserHomeScreen = () => {
  useEffect(() => {
    const html5QrCode = new Html5Qrcode(
      "reader", { formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE] }
    );
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
      /* handle success */
      console.log(`Decoded text: ${decodedText}`);
    };
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    // Start the scanner
    html5QrCode.start({ facingMode: "user" }, config, qrCodeSuccessCallback)
      .catch(err => console.error(`Error starting QR code scanner: ${err}`));

    // Cleanup function to stop the scanner
    return () => {
      html5QrCode.stop().catch(err => console.error(`Error stopping QR code scanner: ${err}`));
    };
  }, []);

  return <div id="reader"></div>;
};

export default UserHomeScreen;
