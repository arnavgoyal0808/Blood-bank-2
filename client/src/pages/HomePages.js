import React , {useEffect , useState}  from 'react'
import { useSelector } from 'react-redux';
import Spinners from '../components/shared/Spinnerss';
import Layout from '../components/shared/Layout/Layout';
import Modals from '../components/shared/modals/modalss';
import API from '../services/API';


const HomePage = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const [data , setData] = useState([])
  
 

  //get function
  const getBloodRecords = async () => {
    try {
      const response = await API.get('/inventory/get-inventory');
      console.log(response)
        
      if (response.data?.success) {
        setData(response.data.inventory);
        
        
      }
    } catch (error) {
      console.error('Error fetching blood records:', error);
    }
  };
  useEffect(()=>{
    getBloodRecords();
  } ,[])
  
  return (
    <Layout>
      
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinners />
      ) : (
        <>
        <div className='container'>
        <h4 className='ms-4' data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{cursor:'pointer'}}>
          <i className='fa-solid fa-plus text-success py-4'></i>
          Add Inventory
        </h4>
       <table className="table">
  <thead>
    <tr>
      <th scope="col">Blood Group</th>
      <th scope="col">invetoryType</th>
      <th scope="col">Quantity</th>
      <th scope="col">time & date</th>
    </tr>
  </thead>
  <tbody>
    {data?.map(record =>(
      <tr key={record._id}>
      
      <td>{record.bloodgroup}</td>
      <td>{record.invetoryType}</td>
      <td>{record.quantity}</td>
      <td>{record.createdAt}</td>
     
    </tr>
    ))}
    
  </tbody>
</table>

        <Modals/>
        </div>
 
        </>
      )}
    </Layout>
  );
};

export default HomePage;