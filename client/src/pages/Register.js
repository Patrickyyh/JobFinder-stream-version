import React from 'react'
import { useState,useEffect } from 'react'
import { Logo , FormRow,Alert} from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'
import { DISPLAY_ALERT } from '../context/actions'
import { useNavigate } from 'react-router-dom'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMemeber: true,
}


export const Register = () => {
  const  [values , setValues] = useState(initialState);
  const state = useAppContext();

  const {user} = useAppContext();
  const navigate = useNavigate();

  useEffect(()=>{
      if(user){
          setTimeout(() => {
            navigate('/')
          }, 3000);
      }
  }, [user, navigate]);


  const {isLoading , showAlert,displayAlert,registerUser,loginUser} = useAppContext();
  // console.log(state);
  
  const toggleMember =  () =>{
      setValues({...values,isMemeber: !values.isMemeber})
  }

  const handleChange = (e) => {
    //update the values in the state 
    setValues({...values,[e.target.name]: e.target.value})
    
  }
  
  const onSubmit = (e) =>{
    e.preventDefault();
    const {name , email, password,isMemeber} = values;
    if(! email || !password || (!isMemeber && !name)){
       // call the the dispatcher over here 
       displayAlert(); 
       return;
       
    }

    const currentUser = {name , email , password}; 
    if(isMemeber){
        // Login in the user 
        loginUser(currentUser);
    }else{
        // register the user and passing the value of the user into the
        // currentUser
        registerUser(currentUser); 
    }
    
    
    console.log(values);

  }
  
 
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
         <Logo />
         <h3>{values.isMemeber? 'Login':'Register'}</h3>
          {showAlert && <Alert />}
         {/* Now set up another componentsFormRow */}
         {!values.isMemeber 
            && 
          <FormRow type = "text" name = "name" value = {values.name} handleChange = {handleChange}/>
         }
         <FormRow type = "email" name = "email" value = {values.email} handleChange = {handleChange}/>
         <FormRow type = "password" name = "password" value = {values.password} handleChange = {handleChange}/>
         <button type ="submit" className='btn btn-block' disabled = {isLoading}>
           submit
         </button>

         <p>
           {values.isMemeber ? 'Not a member yet' : 'Already a member ?'}
            <button type = "button"
             onClick={toggleMember}
             className = "member-btn">
                {values.isMemeber ? 'Register' : 'Login'}
             </button>
         </p>

      </form>


    </Wrapper>
  )
}
