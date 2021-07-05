import Axios from "axios";
export const createFormDetails = (uid,email,formschemaobj,formschema) => async (dispatch) => {
    dispatch({ type: 'CREATE_FORM_DETAILS_REQUEST', payload: { formschemaobj } });
      try {
      const { data } = await Axios.post('/api/forms/createformdetails', {
          uid,email,formschemaobj,formschema
      });
      dispatch({ type: 'CREATE_FORM_DETAILS_SUCCESS', payload: data });
      dispatch({ type: 'CHECK_FORM_CREATED_SUCCESS', payload: data });
      //alert(typeof(data)+" "+JSON.stringify(data))
      localStorage.setItem('formDetailsInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: 'CREATE_FORM_DETAILS_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const checkFormCreated = (email) => async (dispatch) => {
    dispatch({ type: 'CHECK_FORM_CREATED_REQUEST', payload: { email} });
    try {
      const { data } = await Axios.post('/api/forms/checkformcreated', { email});
      dispatch({ type: 'CHECK_FORM_CREATED_SUCCESS', payload: data });
      localStorage.setItem('formDetailsInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: 'CHECK_FORM_CREATED_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  
  export const enterFormDetails = (formId) => async (dispatch) => {
    dispatch({ type: 'ENTER_FORM_DETAILS_REQUEST', payload: { formId} });
    try {
     
      const { data } = await Axios.post('/api/forms/enterformdetails', { formId});
      dispatch({ type: 'ENTER_FORM_DETAILS_SUCCESS', payload: data });
    
    } catch (error) {
      dispatch({
        type: 'ENTER_FORM_DETAILS_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  export const getFormData = (formdata,formschema) => async (dispatch) => {
    console.log("->"+formschema);
    dispatch({ type: 'GET_FORM_DATA_REQUEST', payload: { formdata,formschema} });
    try {
     
      const { data } = await Axios.post('/api/forms/collectresponse', 
      { formdata
        
      });
      dispatch({ type: 'GET_FORM_DATA_SUCCESS', payload: data });
    
    } catch (error) {
      dispatch({
        type: 'GET_FORM_DATA_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const getMyFormData = (formId) => async (dispatch) => {
    dispatch({ type: 'GET_MY_FORM_REQUEST', payload: { formId} });
    try {
     
      const { data } = await Axios.post('/api/forms/getmyformdetails', { formId});
      dispatch({ type: 'GET_MY_FORM_SUCCESS', payload: data });
    
    } catch (error) {
      dispatch({
        type: 'GET_MY_FORM_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };