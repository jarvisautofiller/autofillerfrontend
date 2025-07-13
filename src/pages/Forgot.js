const ForgotPassword = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
  
    const validateForm = () => {
      const errors = {};
      if (!phoneNumber) {
        errors.phoneNumber = 'Phone number is required';
      } else if (!/^\d{10}$/.test(phoneNumber)) {
        errors.phoneNumber = 'Phone number should be 10 digits';
      }
      return errors;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
  
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/llp/forgot-password`, {
          phoneNumber,
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (response.data.success) {
          toast.success("Password reset link sent!");
          navigate('/login');
        } else {
          toast.error(response.data.message || "Failed to send reset link");
        }
      } catch (error) {
        console.error("Error during password reset", error);
        toast.error(error.response.data.message || "Something went wrong. Please try again later.");
      }
    };
  
    return (
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
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Forgot Password</h5>
                      <p className="text-muted">Enter your phone number to reset your password.</p>
                    </div>
                    <div className="p-2 mt-4">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                          <input
                            type="tel"
                            className="form-control"
                            id="phoneNumber"
                            placeholder="Enter Your Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)} />
                          {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
                        </div>
  
                        <div className="mt-4">
                          <button className="btn btn-success w-100" type="submit">Send Reset Link</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
  
                <div className="mt-4 text-center">
                  <p className="mb-0">Remember your password?
                    <Link
                      to="/login"
                      className="fw-semibold text-primary text-decoration-underline"
                    >
                      Sign In
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
  
  export default ForgotPassword;