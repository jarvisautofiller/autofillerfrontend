import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginContainer } from '../pages/Common.styled.ts';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate=useNavigate();

  // Validation function for email and password
  const validateForm = () => {
    const errors = {};
    if (!phoneNumber) {
      phoneNumber = 'phoneNumber number is required';
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      phoneNumber = 'phoneNumber number should be 10 digits';
    }
    if (!password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    // const validationErrors = validateForm();
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }

    try {
      console.log(`${process.env.REACT_APP_BACKEND_URL}/llp/login`);
      // Make API request to login
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/llp/login`, {
        headers: {
          'phoneNumber': phoneNumber,
          'password': password,
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
 
  
        toast.success("Login successful!");
        // Redirect or save token as needed
        const token = response.data.message;
        
        sessionStorage.setItem('userData',token); 
        
        // sessionStorage.setItem("authToken", token);
        navigate('/Cart')
        fetchUserDetails();
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
    
       
        toast.error(error.response.data.message || "Error while processing");
    
         
    }
  };

 

  // useEffect(() => {
    
  // }, []);
  const fetchUserDetails = async () => {
    try {
      // Retrieve token from localStorage or other secure storage
      const token = sessionStorage.getItem('authToken'); // Replace with actual token retrieval

      
      if (!token) {
        // setError('User is not logged in');
        return;
      }

      // Make the API request with the token in the Authorization header
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/llp/login`,{}, {
        headers: {
          'phoneNumber': phoneNumber,
          'password': password,
          'Content-Type': 'application/json'
        }
      });

      
      if (response.data.success) {

        sessionStorage.setItem('userData',JSON.stringify(response.data.user)); 
        console.log("userData is updated");
      } else {
        console.log(response.data.message || 'Failed to fetch user details');
      }
    } catch (err) {
      console.error('Error fetching user details:', err);
      console.log(err.response?.data?.message || 'An error occurred');
    }
  };

  // fetchUserDetails();

  return (
    <LoginContainer>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div>
          <label htmlFor="document">Document:</label>
          <input
            type="file"
            id="document"
            onChange={(e) => console.log(e.target.files[0])} // Handle file upload logic here
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </LoginContainer>
  );
};

export default Login;
