import { useState } from "react";
import BarcodeScanner from "./Scanner"
import { Link } from "react-router-dom";

const BarcodeScannerLike = () => {
    const [barcode, setBarcode] = useState('');
    const handleDetected = (result) => {
        setBarcode(result.codeResult.code);
    };
    return (
        <div className="main-content">

            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Barcode</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><Link>Apps</Link></li>
                                        <li className="breadcrumb-item active">Barcode</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                    <BarcodeScanner onDetected={handleDetected} />
                    <p>Scanned Barcode: {barcode}</p>
                </div>
            </div>
        </div>


    )
}

export default BarcodeScannerLike;