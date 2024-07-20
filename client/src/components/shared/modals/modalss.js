import React , {useState} from 'react'
import { useSelector } from 'react-redux';
import InputType from '../forms/InputTypes'
import API from '../../../services/API';

const Modals = () => {
  const [invetoryType ,  setInvetoryType] = useState('in');
  const [bloodgroup ,  setBloodgroup] = useState('');
  const [quantity ,  setQuantity] = useState(0);
  const [email ,  setEmail] = useState('');
  const {user} = useSelector(state => state.auth)
  // handle modal data
  const handleModalSubmit = async () => {
    try {
      if (!bloodgroup || !quantity) {
      return alert("please provide all fields")
      }
      
      
      const response  = await API.post('/inventory/create-inventory',{
        invetoryType,
        bloodgroup,
        quantity,
        email,
        organisation: user?._id,   
      });
      
      
      
      if (response.data?.success) {
        alert('New record added');
        window.location.reload();
        
      }
    } catch (error) {
      alert(error.response.data.message || 'An error occurred');
      console.log(error);
      window.location.reload();
    }
  };
  return (
    <>
    
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Manage Blood Records</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <div className="modal-body">
        <div className='d-flex mb-3'>
          <span>Blood Type: &nbsp;</span>
          <div className='form-check ms-4'>
            <input 
              type='radio'
              name='inRadio'
              id='in'
              defaultChecked 
              value='in' 
              onChange={(e) => setInvetoryType(e.target.value)} 
              className='form-check-input'
            />
            <label htmlFor='in' className='form-check-label'>
              IN
            </label>
          </div>
          <div className='form-check ms-4'>
            <input 
              type='radio'
              name='inRadio'
              id='out'
              value='out' 
              onChange={(e) => setInvetoryType(e.target.value)} 
              className='form-check-input'
            />
            <label htmlFor='out' className='form-check-label'>
              OUT
            </label>
          </div>
        </div>
        <select 
        className="form-select" 
        aria-label="Default select example" 
        defaultValue=""
        onChange={(e) => setBloodgroup(e.target.value)}
      >
      <option defaultValue={"please select your blood group"}>please select your blood group</option>
      <option value={'O+'}>O+</option>
      <option value={'O-'}>O-</option>
      <option value={'AB+'}>AB+</option>
      <option value={'AB-'}>AB-</option>
      <option value={'A+'}>A+</option>
      <option value={'A-'}>A-</option>
      <option value={'B+'}>B+</option>
      <option value={'B-'}>B-</option>
        </select>
      <InputType Labeltext={'Donar Email'} Labelfor={'donarEmail'} inputType={'email'} 
      value={email} onChange={(e)=>setEmail(e.target.value)}/>  

     <InputType Labeltext={'Quantity (ML)'} Labelfor={'quantity'} inputType={'number'} 
      value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>  

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleModalSubmit}>Submit</button>
      </div>
     
    </div>
  </div>
</div>

  
    </>
  )
}

export default Modals
