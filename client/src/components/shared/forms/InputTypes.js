import React from 'react';

const InputType = ({ Labeltext, Labelfor, inputType, value, onChange, name }) => {
  return (
    <>
      <div className="mb-1">
        <label htmlFor={Labelfor} className="form-label">{Labeltext}</label>
        <input
          type={inputType}
          className="form-control"
          id={Labelfor}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default InputType;
