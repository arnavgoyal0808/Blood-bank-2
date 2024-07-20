import React, { useEffect } from 'react';
import Form from '../../components/shared/forms/Formss';
import { useSelector } from 'react-redux';
import Spinners from '../../components/shared/Spinnerss';


const Login = () => {
  const { loading, error } = useSelector(state => state.auth);
  useEffect(() => {
    if (error) {
      alert("error")
    }
  }, [error]); // Run the effect whenever the error changes
  
  return (
    <>
    
      {loading ? <Spinners /> : (
        <div className="row g-0">
          <div className="col-md-8 form-banner">
            <img 
              className="form-banner"
              src="https://www.shutterstock.com/shutterstock/photos/2117917952/display_1500/stock-vector-blood-bag-heart-donation-day-poster-2117917952.jpg" 
              alt="Blood bag heart donation day poster" 
            />
          </div>
          <div className="col-md-4 form-container">
            <Form formTitle="Login page" submitButton="Login" FormType="Login" />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;