import { createStore,compose,applyMiddleware,combineReducers } from "redux";
import thunk from "redux-thunk";
import { checkFormCreatedReducer, createFormDetailsReducer, enterFormDetailsReducer, getFormDataReducer, getMyFormDataReducer } from "./reducers/formReducers";
import { userRegisterReducer, userSigninReducer } from "./reducers/userReducers";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  checkFormCreated:{
    formInfo:localStorage.getItem('formDetailsInfo')
    ? JSON.parse(localStorage.getItem('formDetailsInfo'))
    :null
  }
  };
  const reducer = combineReducers({
      userRegister:userRegisterReducer,
      userSignin:userSigninReducer,
      createFormDetails:createFormDetailsReducer,
      checkFormCreated:checkFormCreatedReducer,
      enterFormDetails:enterFormDetailsReducer,
      getFormData:getFormDataReducer,
      getMyFormData:getMyFormDataReducer
  });
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
  );
  
  export default store;
  