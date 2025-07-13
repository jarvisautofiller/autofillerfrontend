import React, { useState, useEffect } from 'react';
import Quagga from 'quagga';

const BarcodeCellRenderer = (props) => {
  const [isScanning, setIsScanning] = useState(false);
  const [barcode, setBarcode] = useState(props.value);

  useEffect(() => {
    if (isScanning) {
      Quagga.init({
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector(`#scanner-container-${props.node.id}`),
          constraints: {
            width: 320,
            height: 240,
            facingMode: 'environment', // Use the back camera
          },
        },
        decoder: {
          readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'code_39_reader', 'upc_reader', 'upc_e_reader', 'codabar_reader'],
        },
      }, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      });

      Quagga.onDetected((result) => {
        setBarcode(result.codeResult.code);
        props.setValue(result.codeResult.code);
        Quagga.stop();
        setIsScanning(false);
      });

      return () => {
        Quagga.stop();
      };
    }
  }, [isScanning, props]);

  return (
    <div>
      <input
        type="text"
        value={barcode}
        styles={{with:'20px'}}
        onChange={(e) => {
          setBarcode(e.target.value);
          props.setValue(e.target.value);
          
        }}
      />
      <button onClick={() => setIsScanning(true)}>Scan</button>
      {isScanning && <div id={`scanner-container-${props.node.id}`} style={{ width: '100%', height: '100%' }}></div>}
    </div>
  );
};

export default BarcodeCellRenderer;
