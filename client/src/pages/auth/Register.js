import React, { useEffect } from 'react'
import Form from '../../components/shared/forms/Formss'
import { useSelector } from 'react-redux'
import Spinners from '../../components/shared/Spinnerss'


const Register = () => {
  const {loading , error} = useSelector(state =>state.auth)
  useEffect(() => {
    if (error) {
      alert("error")
    }
  }, [error]); 
  return (
    <>
    {loading ? <Spinners/> :(
      <div
      className="row g-0">
        <div className="col-md-8 form-banner2">
          <img src="https://github.com/techinfo-youtube/Blood-Bank-Mern-Stack-Project/blob/main/client/public/assets/images/banner2.jpg?raw=true" alt='registerImage'/>
        </div>
        <div className='col-md-4 form-container'>
          <Form formTitle={'Register'} submitButton={'Register'}  FormType={'Register'}/>
        </div>
      </div>
      
    )}
 
    </>
  );
};

export default Register;
