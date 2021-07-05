export const createFormDetailsReducer =(state={},action)=> {
    switch (action.type) {
        case 'CREATE_FORM_DETAILS_REQUEST':
          return { loading: true };
        case 'CREATE_FORM_DETAILS_SUCCESS':
          return { loading: false, formInfo: action.payload };
        case 'CREATE_FORM_DETAILS_FAIL':
          return { loading: false, error: action.payload };
        default:
          return state;
      }
}
export const checkFormCreatedReducer = (state={},action) => {
  switch (action.type) {
    case 'CHECK_FORM_CREATED_REQUEST':
      return { loading: true };
    case 'CHECK_FORM_CREATED_SUCCESS':
      return { loading: false, formInfo: action.payload };
    case 'CHECK_FORM_CREATED_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
export const enterFormDetailsReducer = (state={},action) => {
  switch (action.type) {
    case 'ENTER_FORM_DETAILS_REQUEST':
      return { loading: true };
    case 'ENTER_FORM_DETAILS_SUCCESS':
      return { loading: false, formInfo: action.payload };
    case 'ENTER_FORM_DETAILS_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
export const getFormDataReducer = (state={},action) => {
  switch (action.type) {
    case 'GET_FORM_DATA_REQUEST':
      return { loading: true };
    case 'GET_FORM_DATA_SUCCESS':
      return { loading: false, formInfo: action.payload };
    case 'GET_FORM_DATA_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const getMyFormDataReducer = (state={},action) => {
  switch (action.type) {
    case 'GET_MY_FORM_REQUEST':
      return { loading: true };
    case 'GET_MY_FORM_SUCCESS':
      return { loading: false, myformInfo: action.payload };
    case 'GET_MY_FORM_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
