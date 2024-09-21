import React, { useState } from 'react'
import "../addUser/addUser.css"
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
const Adduser = () => {
  const users= {
    name:"",
    email:"",
    address:""
  };
  const [user,setUser] = useState(users);
  const navigate = useNavigate();
  const inputHandler = (e) => {
    const {name,value} = e.target;
    // console.log(name,value);
    setUser({...user,[name]: value});
  }

  const submitHandler = async(e) => {
    console.log("sd")
    e.preventDefault();
   
    await axios.post("http://localhost:8000/api/user",user)
      .then((response) => {
        toast.success(response.data.message, {position: "top-right"});
        navigate("/");

      }).catch((error) => {
        // toast.success(error.data.message);
        console.log(error)
      } )

  }
  return (
    <div className='addUser'>
      <button className='backButton' >
        &#8592; Back
      </button>
      <h3> Add new user</h3>
      <form className='addUserForm' onSubmit={submitHandler}>
        <div className='inputGroup'>
          <label htmlFor='name'>Name : </label>
          <input 
            type="text" 
            id='name' 
            onChange={inputHandler}
            name='name' 
            autoComplete='off' 
            placeholder='Enter your name' 
          ></input>
        </div>
        <div className='inputGroup'>
          <label htmlFor='email'>Email : </label> 
          <input 
            type="email" 
            id='email' 
            onChange={inputHandler}
            name='email' 
            autoComplete='off' 
            placeholder='Enter your email' 
          ></input> 
        </div> 
        <div className='inputGroup'> 
          <label htmlFor='address'>Address : </label> 
          <input 
            type="text" 
            id='address' 
            onChange={inputHandler}
            name='address'
            autoComplete='off' 
            placeholder='Enter your address' 
          ></input> 
        </div> 
        <div className='inputGroup'>
          <button type='submit'  className='btn btn-primary'>Submit</button>
        </div>
      </form>
    </div> 
  )
}

export default Adduser