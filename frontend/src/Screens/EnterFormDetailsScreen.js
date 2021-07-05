import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enterFormDetails, getFormData } from '../actions/formActions';

export default function EnterFormDetailsScreen(props) {
    const formId = props.match.params.id;
    const dispatch = useDispatch();
    const enterDetails = useSelector((state) => state.enterFormDetails);
    const { formInfo, loading, error } = enterDetails;
    
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo} = userSignin;
    const getData = useSelector((state) => state.getFormData);
    const { formDataInfo} = getData;
    useEffect(()=>{
        if(!formInfo){
        dispatch(enterFormDetails(formId))
        }
    },[formInfo])
    const FormDisplay = (ele) => {
        if(ele[0] === "ownerid"){
            return <></>;
        }
        return (
            <>
                <tr>
                <th><label htmlFor={ele[0]}>{ele[0]}</label></th>
                    {
                        ele[1] === "String" ? (
                            <td><input type="text" name={ele[0]} required></input></td>
                        ):(
                            <td><input type="number" name={ele[0]} required></input></td>
                        )
                    }
                    
                   
                </tr>
            
            </>
        )
      }
      const submitHandler = (e) => {
         e.preventDefault();
         var count = e.target.elements.length;
        
          var obj ={};
          var i;
          for (i = 0; i < count-1; i++) {
          obj[e.target.elements[i].name] = e.target.elements[i].value;
          }
          //alert(JSON.stringify(obj));
        
        dispatch(getFormData(obj,formInfo.formschema))
        alert("Submitted Successfully");
        window.location.replace("/");
      }
      
    return (
        <div>
            
            {userInfo && formInfo && 
            <center>
            <h1>Enter Details</h1>
           
            <form className="normal-form" onSubmit={submitHandler} name="submit-data-form" method="post" >
            <table className="form-table">
            <input type="hidden" name="ownerid" value={formId}></input>
            {Object.entries(formInfo.formschemaobj).map(FormDisplay)}
            <tr>
                <td colSpan="2"><br></br>
                <button type="submit" className="normal-btn">Submit</button></td>
            </tr>
            </table>
            
            </form>
            </center>}
        </div>
    )
}
