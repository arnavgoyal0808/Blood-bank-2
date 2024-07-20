import React, { useState } from 'react';
import InputType from './InputTypes';
import {Link} from "react-router-dom";
import { handleLogin, handleRegister } from '../../../services/authServices';

const Form = ({ FormType, submitButton, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  
  return (
    <div>
      <form onSubmit={(e)=>{
        if(FormType === 'Login') return handleLogin(e ,email , password , role)
          else if (FormType === 'Register') return handleRegister(e , name , role , email , password ,organisationName , hospitalName, website, address ,phone)

      }}>
        <h1 className='text-center'>{formTitle}</h1>
        <hr/>
        <div className='d-flex mb-3'>
          <div className='form-check'>
            <input type="radio" className="form-check-input" name='role' id="donarRadio"
              value="donar" checked={role === "donar"} onChange={(e) => setRole(e.target.value)} />
            <label htmlFor='donarRadio' className='form-check-label'>
              donar
            </label>
          </div>

          <div className='form-check ms-2'>
            <input type="radio" className="form-check-input" name='role' id="adminRadio"
              value="Admin" checked={role === "Admin"} onChange={(e) => setRole(e.target.value)} />
            <label htmlFor='adminRadio' className='form-check-label'>
              Admin
            </label>
          </div>

          <div className='form-check ms-2'>
            <input type="radio" className="form-check-input" name='role' id="hospitalRadio"
              value="Hospital" checked={role === "Hospital"} onChange={(e) => setRole(e.target.value)} />
            <label htmlFor='hospitalRadio' className='form-check-label'>
              Hospital
            </label>
          </div>

          <div className='form-check ms-2'>
            <input type="radio" className="form-check-input" name='role' id="organisationRadio"
              value="Organisation" checked={role === "Organisation"} onChange={(e) => setRole(e.target.value)} />
            <label htmlFor='organisationRadio' className='form-check-label'>
              Organisation
            </label>
          </div>
        </div>

        {FormType === 'Login' && (
  <>
    <InputType
      Labeltext="Email"
      Labelfor="loginEmail"
      inputType="email"
      name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <InputType
      Labeltext="Password"
      Labelfor="loginPassword"
      inputType="password"
      name="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </>
)}

{FormType === 'Register' && (
  <>
    <InputType
      Labeltext="Email"
      Labelfor="registerEmail"
      inputType="email"
      name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <InputType
      Labeltext="Password"
      Labelfor="registerPassword"
      inputType="password"
      name="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    {(role === 'donar' || role === 'Admin') && (
      <InputType
        Labeltext="Name"
        Labelfor="registerName"
        inputType="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    )}
    {role === 'Organisation' && (
      <InputType
        Labeltext="Organisation Name"
        Labelfor="registerOrganisationName"
        inputType="text"
        name="organisation"
        value={organisationName}
        onChange={(e) => setOrganisationName(e.target.value)}
      />
    )}
    {role === 'Hospital' && (
      <InputType
        Labeltext="Hospital Name"
        Labelfor="registerHospitalName"
        inputType="text"
        name="hospital"
        value={hospitalName}
        onChange={(e) => setHospitalName(e.target.value)}
      />
    )}
    <InputType
      Labeltext="Website"
      Labelfor="registerWebsite"
      inputType="text"
      name="website"
      value={website}
      onChange={(e) => setWebsite(e.target.value)}
    />
    <InputType
      Labeltext="Address"
      Labelfor="registerAddress"
      inputType="text"
      name="address"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
    />
    <InputType
      Labeltext="Phone"
      Labelfor="registerPhone"
      inputType="text"
      name="phone"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
    />
  </>
)}

<div className="d-flex flex-row justify-content-between">
          {FormType === 'Login' ? (
            <p>Not registered yet? Register <Link to="/Register">Here!</Link></p>
          ) : (
            <p>Already a user? Please <Link to="/Login">Login!</Link></p>
          )}
          <button className="btn btn-primary" type="submit">
            {submitButton}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
