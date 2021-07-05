import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createFormDetails } from '../actions/formActions';

export default function FormScreen() {
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;
    const checkFormCreated = useSelector((state) => state.checkFormCreated);
    const { formInfo} = checkFormCreated;
    
    if(!userInfo){
    window.location.replace("/signin")
    }
    if(formInfo){
        window.location.replace("/")
    }
    const [fieldName,setFieldName] = useState("");
    const [fieldType,setFieldType] = useState("String");
    var [schema,setSchema] = useState("");
    const [schemaObj,setSchemaObj] = useState('{');
    const [btnText,setBtnText] = useState("save");
    const submitHandler = (e)=>{
      e.preventDefault();
      setSchema(schema+fieldName+":"+fieldType+",");
      setSchemaObj(schemaObj+`"${fieldName}":"${fieldType}",`);
    }
    const saveHandler =() => {
        if(btnText === "confirm"){
            
            confirmHandler();
            return
        }
        var ownerid="ownerid";
        var stringl="String";
        var r = "}";
        setSchema(schema.slice(0,schema.length)+ownerid+":"+stringl);
        setSchemaObj(schemaObj.slice(0,schemaObj.length) +`"${ownerid}":"${stringl}"`+r);
        setBtnText("confirm");
        
    }
    const confirmHandler = () => {
        localStorage.setItem('formschema',schema);
        localStorage.setItem('formDetails',schemaObj);
        
        dispatch(createFormDetails(userInfo._id,userInfo.email,JSON.parse(schemaObj),schema))
       
    }
    return (
        <div>
            
            <center>
                
            <h1>Create Form</h1>
            <form onSubmit={submitHandler} className="normal-form">
                <table className="form-table">
                <tr>
                <th><label htmlFor="fieldname">FieldName</label></th>
                <td><input type="text" required onChange={(e) => setFieldName(e.target.value)}></input></td>
                </tr>
                <tr>
                <th><label htmlFor="fieldtype">FieldType</label></th>
                <td><select value={fieldType} onChange={(e) => setFieldType(e.target.value)} required>
                   <option>String</option>
                   <option>Number</option>
                </select>
                </td>
                </tr>
                <tr>
                <td colSpan="2"><br></br><button className="normal-btn" type="submit" onClick={submitHandler}>Submit</button></td>
                </tr>
                </table>
            </form>
            <br></br>
            {btnText === "save" ? 
            <button className="normal-btn" onClick={saveHandler}>Save</button> :
            <div><br></br><br></br><button className="normal-btn" onClick={saveHandler}>Confirm</button></div>}
            {/* <br></br>{schema}
            <br></br>
            {schemaObj} */}
            </center>
        </div>
    )
}
