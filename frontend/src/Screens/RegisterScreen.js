import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
// import { useHistory } from 'react-router-dom';
export default function RegisterScreen() {
    const [name,setName] =  useState("");
    const [email,setEmail] =  useState("");
    const [password,setPassword] =  useState("");
    const [confirmPassword,setConfirmPassword] =  useState(""); 
    
    //const userInfo  = localStorage.getItem('userInfo');
    
    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;
    const dispatch = useDispatch();
    // const history = useHistory();
    const submitHandler = (e) => {
        e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password and confirm password are not match');
    } else {
        alert("hello 19.Registerscreen")
      dispatch(register(name, email, password));
    }
    }
    useEffect(()=> {
        if(userInfo){
            window.location.replace("/");
        }
    },[userInfo])
    return (
        
        <div>
            <center>
            <h1>Register</h1>
            <form onSubmit={submitHandler} className="normal-form">
            <table className="form-table">
            <tr>
                <th><label htmlFor="Name">Name</label></th>
                <td><input type="text" onChange={(e) =>{setName(e.target.value)}} required></input></td>
            </tr>
            <tr>
                <th><label htmlFor="Email">Email</label></th>
                <td><input type="email" onChange={(e) =>{setEmail(e.target.value)}} required></input></td>
            </tr> 
            <tr>
            <th><label htmlFor="Password">Password</label></th>
            <td> <input type="password" onChange={(e) =>{setPassword(e.target.value)}} required></input></td>
            </tr>   
            <tr>
            <th><label htmlFor="Confirm Password">Confirm Password</label></th>
            <td><input type="password" onChange={(e) =>{setConfirmPassword(e.target.value)}} required></input></td>
            </tr>
            <tr>
                <td colSpan="2"><br></br><button type="submit" className="normal-btn">Register</button></td>
            </tr>
             
            </table>    
            <div>
            Already customer?{' '}
            <Link to="/signin">
             Log into account
            </Link>
            </div>
            </form>
            </center>
        </div>
        
    )
}
