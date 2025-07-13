

// import { useState } from "react";
// import { useZxing } from "react-zxing";


// const BarcodeScanner = () => {
//   const [result, setResult] = useState("");
//   const { ref } = useZxing({
//   onDecodeResult(result) {
//     setResult(result.getText());
//   },
//   constraints: {
//     video: {
//       width: { ideal: 1920},
//       height: { ideal: 1080 },
//       facingMode: "environment",
//     },
//   },
//   scanDelay: 300,
//   tryHarder: true,
//   decodeFormats: ['UPC_A', 'UPC_E'],  // Specify UPC barcode formats
// });
//   return (
//     <>
//       <video ref={ref} />
//       <p>
//         <span>Last result:</span>
//         <span>{result}</span>
//       </p>
//     </>
//   );}
// //   const [barcode, setBarcode] = useState('');
// //   const [imageSrc, setImageSrc] = useState('');
// //   const videoRef = useRef(null); const photoRef = useRef(null); 
// //   const [photo, setPhoto] = useState('');
// //   const [photo1, setPhoto1] = useState('');
// //   const [photo2, setPhoto2] = useState('');
// //   const [photo3, setPhoto3] = useState('');

// //   const handleFileChange = (event) => {
// //     const file = event.target.files[0];
// //     const reader = new FileReader();

// //     reader.onload = () => {
// //       setImageSrc(reader.result);
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   const scanBarcode = () => {
// //     Quagga.decodeSingle({
// //       decoder: {
// //         readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'code_39_reader', 'code_39_vin_reader', 'codabar_reader', 'upc_reader', 'upc_e_reader', 'i2of5_reader'],
// //       },
// //       locate: true,
// //       src: photo,
// //     }, (result) => {
// //         console.log("i am in result");
// //         console.log(result);
// //       if (result && result.codeResult) {
// //         setBarcode(result.codeResult.code);
// //       } else {
// //         alert('No barcode detected');
// //       }
// //     });
// //   };



// //   const capturePhoto = () => {
// //     const width = videoRef.current.videoWidth;
// //     const height = videoRef.current.videoHeight;
// //     const canvas = document.createElement('canvas');
// //     canvas.width = width;
// //     canvas.height = height;
// //     const ctx = canvas.getContext('2d');
// //     ctx.drawImage(videoRef.current, 0, 0, width, height);
// //     const dataURL = canvas.toDataURL('image/png');
// //     setPhoto(dataURL);
// //   };
// //   const capturePhoto1 = () => {
// //     const width = videoRef.current.videoWidth;
// //     const height = videoRef.current.videoHeight;
// //     const canvas = document.createElement('canvas');
// //     canvas.width = width;
// //     canvas.height = height;
// //     const ctx = canvas.getContext('2d');
// //     ctx.drawImage(videoRef.current, 0, 0, width, height);
// //     const dataURL = canvas.toDataURL('image/png');
// //     setPhoto1(dataURL);
// //   };
// //   const capturePhoto2 = () => {
// //     const width = videoRef.current.videoWidth;
// //     const height = videoRef.current.videoHeight;
// //     const canvas = document.createElement('canvas');
// //     canvas.width = width;
// //     canvas.height = height;
// //     const ctx = canvas.getContext('2d');
// //     ctx.drawImage(videoRef.current, 0, 0, width, height);
// //     const dataURL = canvas.toDataURL('image/png');
// //     setPhoto2(dataURL);
// //   };
// //   const startCamera = async () => { 
// //     const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
// //      videoRef.current.srcObject = stream; 
// //      videoRef.current.play(); };

// //      const combinePhotos = () => {
// //         const canvas = document.createElement('canvas');
// //         const ctx = canvas.getContext('2d');

// //         const img1 = new Image();
// //         const img2 = new Image();
// //         const img3 = new Image();

// //         img1.src = photo;
// //         img2.src = photo1;
// //         img3.src = photo2;
// //  //combine means not add, i want to mix all together and get one clarity images;
// //         img1.onload = () => {
// //             canvas.width = img1.width;
// //             canvas.height = img1.height * 3; // Assuming all images have the same dimensions

// //             ctx.drawImage(img1, 0, 0);
// //             img2.onload = () => {
// //                 ctx.drawImage(img2, 0, img1.height);
// //                 img3.onload = () => {
// //                     ctx.drawImage(img3, 0, img1.height * 2);
// //                     const combinedDataURL = canvas.toDataURL('image/png');
// //                     setPhoto3(combinedDataURL);
// //                 };
// //             };
// //         };
// //     };


// //   return (
// //     <div>
// //         //i need to add 
// //       <h1>Barcode Scanner</h1>
// //       <video ref={videoRef} width="300" height="200"></video> <button onClick={startCamera}>Start Camera</button> 
// //       <button onClick={capturePhoto}>Capture Photo</button>
// //       <button onClick={capturePhoto1}>Capture Photo</button>
// //       <button onClick={capturePhoto2}>Capture Photo</button>
// //       <input type="file" onChange={handleFileChange} />
// //       {/* <button onClick={scanBarcode}>Scan Barcode</button>
// //       {barcode && <p>Scanned Barcode: {barcode}</p>} */}
// //       //i have 3 images(photo, photo1, photo2), how to combine into 1 and get complete clarity picture;


// //     <button onClick={combinePhotos}>Combine Photos</button>
// //       {photo && <img src={photo} alt="Uploaded" style={{ maxWidth: '100%' }} />}
// //       {photo && <img src={photo1} alt="Uploaded" style={{ maxWidth: '100%' }} />}
// //       {photo && <img src={photo2} alt="Uploaded" style={{ maxWidth: '100%' }} />}
// //       {photo3 && <img src={photo3} alt="Uploaded" style={{ maxWidth: '100%' }} />}
// //     </div>

// //   );

// export default BarcodeScanner;


import React, { useEffect } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = ({ onDetected }) => {
  useEffect(() => {
    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: document.querySelector('#scanner-container'),
        constraints: {
          width: 640,
          height: 480,
          facingMode: 'environment', // Use the back camera
        },
      },
      decoder: {
        readers: ['code_128_reader', 'ean_reader', 'ean_8_reader',
          'code_39_reader', 'upc_reader', 'upc_e_reader', 'codabar_reader'],
      },
      locator: {
        patchSize: 'medium',
        halfSample: true,
      },
      locate: true,
    }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      Quagga.start();
    });

    Quagga.onProcessed((result) => {
      const drawingCtx = Quagga.canvas.ctx.overlay;
      const drawingCanvas = Quagga.canvas.dom.overlay;

      // Set the willReadFrequently attribute
      drawingCtx.willReadFrequently = true;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
          result.boxes.filter((box) => box !== result.box).forEach((box) => {
            Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx,
              { color: 'green', lineWidth: 2 });
          });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx,
            { color: 'blue', lineWidth: 2 });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' },
            drawingCtx, { color: 'red', lineWidth: 3 });
        }
      }
    });

    Quagga.onDetected((result) => {
      onDetected(result);
    });

    return () => {
      Quagga.stop();
    };
  }, [onDetected]);

  return (
    <div id="scanner-container" style={{ width: '100%', height: '100%' }}></div>
  );
};

export default BarcodeScanner;
