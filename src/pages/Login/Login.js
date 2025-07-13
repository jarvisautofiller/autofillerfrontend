import axios from "axios";
import React, { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginContainer } from '../Common.styled.ts';


const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Define the async function inside the useEffect
    const fetchData = () => {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/helloWorld`, {})
        .then((backend) => {
          setMessage(backend.data);
          console.log("Message from backend:", backend);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    fetchData();
  // Cleanup function to avoid memory leaks
  }, []);

  // Validation function for email and password

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
  };

  return (

    <div className="auth-page-wrapper pt-5">
  <form onSubmit={handleSubmit}>
       
        <div>
          <label htmlFor="document">Document:</label>
          <input
            type="file"
            id="document"
            onChange={(e) => console.log(e.target.files[0])} // Handle file upload logic here
          />
        </div>
        {message && <p>{typeof message === 'object' ? JSON.stringify(message) : message}</p>}
        <button type="submit">Submit</button>
      
      </form>

      
    </div>
  );
};

export default Login;
