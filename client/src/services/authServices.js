import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";
const handleLogin = (e ,email , password , role) =>{
    e.preventDefault()
    try {
        if(!role || !email || !password){
            return alert("please provide all required feilds")
        }
        store.dispatch(userLogin({email , password , role}));
        
    } catch (error) {
        console.log(error)
        
    }
};
const handleRegister = (
    e, name , role, email, password, organisationName, hospitalName, website, address, phone
) => {
    e.preventDefault();
    try {
       
        store.dispatch(userRegister({ name, role, email, password, organisationName, hospitalName, website, address, phone }));
        
    } catch (error) {
        console.log(error)
    }
}


export {handleLogin ,handleRegister};
