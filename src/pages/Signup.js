import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserModel from "../model/userModel";
import { LoginContainer } from './Common.styled.ts';

const SignUp = () => {
  const [formValues, setFormValues] = useState(new UserModel({}));

  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!formValues.phoneNumber) {
      errors.phoneNumber = 'phoneNumber  is required';
    } else if (!/^\d{10}$/.test(formValues.phoneNumber)) {
      errors.phoneNumber = 'phoneNumber should be 10 digits';
    }
    else{
      setFormErrors({});
      
    }
    return errors;

  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    const errors = validateForm();
    console.log("i am in ");

    if (Object.keys(errors).length === 0) {
      console.log("i am in 2");
      doChanages();
    } else {
      setFormErrors(errors);
    }

  }

  const doChanages = async (e) => {
    try {

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/llp/createAccount`, {}, {
        headers: {
          'phoneNumber': formValues.phoneNumber,
          'password': formValues.password,
          'Content-Type': 'application/json'
        }
      });
      console.log(response, 'res');


      if (response.data) {
        toast.success(response.data.message || 'Registration successful!');

        setFormValues({ username: "", email: "", phoneNumber: "", password: "" });
        setFormErrors("");
        navigate('/login')
      } else {
        toast.error(response.data.message || 'Registration failed!');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error(error.response.data.message || "Something went wrong. Please try again later.");
    }

  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

  };
  return (
    // <LoginContainer>
    // <div className="login-container">
    //   <h2>Sign Up</h2>
    //   <form onSubmit={handleSubmit}>

    //     <div className="form-group">
    //       <label>Phone Number</label>
    //       <input
    //         type="tel"
    //         name="phoneNumber"
    //         placeholder="Enter your phoneNumber number"
    //         value={formValues.phoneNumber}
    //         onChange={handleInputChange}
    //       />
    //       {formErrors.phoneNumber ? <span className="error-message">{formErrors.phoneNumber}</span> : ''}
    //     </div>
    //     <div className="form-group">
    //       <label>Password</label>
    //       <input
    //         type="password"
    //         name="password"
    //         placeholder="Enter your password"
    //         value={formValues.password}
    //         onChange={handleInputChange}
    //       />
    //       {formErrors.password ? <span className="error-message">{formErrors.password}</span> : ''}
    //     </div>
    //     <button type="submit" className="login-btn">
    //       Sign Up

    //     </button>
    //   </form>
    //   <p style={{ textAlign: "center" }}>
    //     Already have an account?{" "}
    //     <Link
    //       to="/login"
    //       className="toggle-link"
    //       style={{ color: "#007BFF", textDecoration: "underline" }}
    //     >
    //       Login
    //     </Link>
    //   </p>
    // </div>
    // </LoginContainer>
    <div className="auth-page-wrapper pt-5">
      <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
        <div className="bg-overlay"></div>

        <div className="shape">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 120">
            <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
          </svg>
        </div>
      </div>

      <div className="auth-page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center mt-sm-5 mb-4 text-white-50">
                <div>
                  <div className="d-inline-block auth-logo">
                    <h3> MAA KIRANA</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card mt-4">

                <div className="card-body p-4">
                  <div className="p-2 mt-4">
                    <form className="needs-validation" onSubmit={handleSubmit}>

                      <div className="mb-3">
                        <label for="useremail" className="form-label">Phone Number <span className="text-danger">*</span></label>
                        <input
                          type="tel"
                          className="form-control"
                          id="useremail"
                          name="phoneNumber"
                          placeholder="Enter your phone number"
                          value={formValues.phoneNumber}
                          onChange={handleInputChange} />
                        {formErrors.phoneNumber ? <span classNameName="error-message">{formErrors.phoneNumber}</span> : ''}
                      </div>
                      <div className="mb-3">
                        <label className="form-label" for="password-input">Password</label>
                        <div className="position-relative auth-pass-inputgroup">
                          <input
                            type="password"
                            className="form-control pe-5 password-input"
                            onpaste="return false"
                            placeholder="Enter password"
                            id="password-input"
                            name="password"
                            value={formValues.password}
                            onChange={handleInputChange}
                          />
                          <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon"><i className="ri-eye-fill align-middle"></i></button>
                          {formErrors.password ? <span className="error-message">{formErrors.password}</span> : ''}
                        </div>
                      </div>

                      <div className="mt-4">
                        <button className="btn btn-success w-100" type="submit">Sign Up</button>
                      </div>
                    </form>

                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p
                  className="mb-0">Already have an account ?
                  <Link
                    to="/login"
                    className="toggle-link"
                    style={{ color: "#007BFF", textDecoration: "underline" }}
                  >
                    Login
                  </Link>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
 