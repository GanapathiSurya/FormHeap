import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import {BrowserRouter,Link,Route} from "react-router-dom";
import { signout } from "./actions/userActions";
import './App.css';
import DetailsScreen from "./Screens/DetailsScreen";
import EnterFormDetailsScreen from "./Screens/EnterFormDetailsScreen";
import FormScreen from "./Screens/FormScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import SigninScreen from "./Screens/SigninScreen";

function App() {
  
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const checkFormCreated = useSelector((state) => state.checkFormCreated);
  const { formInfo} = checkFormCreated;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  const goToMyForm = () => {
    window.location.replace("/forms/"+userInfo._id);
  }
  return (
  <BrowserRouter>
      
      <div className="home-grid">
        <header>
          <div className="row">
            <div>
            <Link to="/" className="brand no-underline">FormHeap</Link>
            </div>
            {/* {userInfo && formInfo && <>
              <div>
              <Link to="/" className="no-underline links">Dashboard</Link>
            </div>
            
            </>}
            {userInfo && !formInfo && <>
              <div>
              <Link to="/createform" className="create-form-btn no-underline links">Create Form</Link>
            </div>
            </>} */}
            {userInfo && formInfo && <>
              <div>
              <button onClick={goToMyForm} className="no-underline links my-form-btn">My Form</button>
            </div>
            
            </>}
            {!userInfo && <>
              <div>
              <Link to="/register" className="no-underline links"><font style={{color:"black"}}>Register</font></Link>
            </div>
            <div>
              <Link to="/signin" className="no-underline links"><font style={{color:"black"}}>Login</font></Link>
            </div></>}
            {userInfo && 
            <table>
              <tr>
                <td className="links">{userInfo && userInfo.name}</td>
                <td><button class="white-btn" onClick={signoutHandler}>Signout</button></td>
              </tr>
            
            </table>}
          </div>
        </header>
        <main>
         <Route path="/createform" component={FormScreen}></Route>
         <Route path="/" exact component={DetailsScreen}></Route>
         <Route path="/register" exact component={RegisterScreen}></Route>
         <Route path="/signin" exact component={SigninScreen}></Route>
         <Route path="/forms/:id" component={EnterFormDetailsScreen} exact></Route>
        </main>
        <footer>

        </footer>
      </div>
      </BrowserRouter>
 
  );
}

export default App;
