import React, { useEffect, useState } from 'react'
import "../updateUser/updateUser.css"
import {Link,useNavigate,useParams} from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
const Updateuser = () => {
  const users= {
    name:"",
    email:"",
    address:""
  };
  const {id} = useParams();
  const [user,setUser] = useState(users);
  const navigate = useNavigate();
  useEffect(()=>{
    axios.get('http://localhost:8000/api/getUserById/'+id)
    .then((response) =>{
      setUser(response.data)
    })
    .catch((error) => console.log(error) )
    // console.log(user)
  },[id])
  const inputHandler = (e) => {
    const {name,value} = e.target;
    // console.log(name,value);
    setUser({...user,[name]: value});
  }

  const submitHandler = async(e) => {
    console.log("sd")
    e.preventDefault();
   
    await axios.put(`http://localhost:8000/api/updateUser/${id}`,user)
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
      <h3> Update user</h3>
      <form className='addUserForm' onSubmit={submitHandler}>
        <div className='inputGroup'>
          <label htmlFor='name'>Name : </label>
          <input 
            type="text" 
            id='name' 
            value={user.name}
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
            value={user.email}
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
            value={user.address}
            onChange={inputHandler}
            name='address'
            autoComplete='off' 
            placeholder='Enter your address' 
          ></input> 
        </div> 
        <div className='inputGroup'>
          <button type='submit'  className='btn btn-primary'>Update</button>
        </div>
      </form>
    </div> 
  )
}

export default Updateuser