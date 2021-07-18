import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkFormCreated } from '../actions/formActions';
import { signin } from '../actions/userActions';

export default function SigninScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
    dispatch(checkFormCreated(email))
  };
  
  // const userInfo  = localStorage.getItem('userInfo');
  useEffect(() => {
    if (userInfo) {
      window.location.replace("/");
    }
  }, [userInfo]);
  return (
    <div>
      <center>
      <h1>Sign In</h1>
      <form onSubmit={submitHandler} className="normal-form">
        <table className="form-table">
          <tr>
            <th><label htmlFor="email">Email address</label></th>
            <td><input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input></td>
          </tr>
          <tr>
            <th><label htmlFor="password">Password</label></th>
            <td><input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input></td>
          </tr>
          <tr>
            <td colSpan="2" align="center"><br></br>
            <button className="normal-btn" type="submit">Sign In</button></td>
          </tr>
          
        </table>
        <div>
         New User?{' '}
            <Link to="/register">
              Create your account
            </Link>
        </div>
      </form>
      </center>
    </div>
  );
}
