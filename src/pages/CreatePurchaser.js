import React, { useState, useEffect } from 'react';
import { SmallTableWrapper,TableWrapper, StyledTable,Button  } from './Common.styled.ts';
import axios from 'axios';
const CreatePurchaser = () => {
  const merchantId = sessionStorage.getItem('userData');
  const [phoneNumber, setPhoneNumber] = useState("");
  const [purchaserName, setPurchaserName] = useState("");
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRow = [{
      userId: merchantId,
      purchaserName: purchaserName,
      phoneNumber: phoneNumber
    }];
    const bodyH = JSON.stringify(newRow);
    console.log(bodyH);
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/createPurchaser`, bodyH,{ headers: { 'Content-Type': 'application/json' }});
    if (response.status) { // POST call is successful, close the pop-up window 
      window.close();
      console.log("done");
    }
  }
  return (
    <div className="login-container">
      <h2>Create Purchaser</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label>Purchaser Name</label>
          <input
            type="text"
            name="purchaserName"
            placeholder="Enter your purchaser Name"
            value={purchaserName}
            onChange={(e) => setPurchaserName(e.target.value)}
          />
          {/* {errors.password && <span className="error-message">{errors.password}</span>} */}
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="PhoneNumber"
            placeholder="Enter your purchaser number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}

          />
          {/* {errors.email && <span className="error-message">{errors.email}</span>} */}
        </div>

        <Button type="submit" className="login-btn">
          Submit
        </Button>
      </form>


    </div>
  );


}


export default CreatePurchaser;