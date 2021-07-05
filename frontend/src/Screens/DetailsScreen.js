import React from 'react'
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyFormData } from '../actions/formActions';
export default function DetailsScreen() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [searchOption,setSearchOption] = useState("");
    const [searchOptionIgnore,setSearchOptionIgnore] = useState("");
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;
    const checkFormCreated = useSelector((state) => state.checkFormCreated);
    const { formInfo} = checkFormCreated;
    const getMyDataForm = useSelector((state) => state.getMyFormData);
    const { myformInfo} = getMyDataForm;
    if(!userInfo){
    window.location.replace("/signin")
    }
    useEffect(()=>{
        if(formInfo){
           dispatch(getMyFormData(userInfo._id))
           //alert(JSON.stringify(myformInfo));
        }
    },[formInfo])
    const FormHead = (ele) => {
      if(ele[0] === "ownerid"){
          return <></>;
      }
      return (
          <th>{ele[0]}</th>
      )
    }
    const searchOptions = (e) => {
        setSearchOption(e.target.attributes.value.value.toLowerCase())
        setSearchOptionIgnore(e.target.attributes.value.value)
    }
    const FormAttributes = (ele) => {
        if(ele[0] === "ownerid"){
            return <></>;
        }
        //alert(typeof(ele[0]))
        return (

            <span className={searchOption === ele[0].toLowerCase() ? "active" : "not-active"} onClick={searchOptions} value={ele[0]}>{ele[0]}</span>
        )
      }
    const SingleRecord = (ele) => {
        if(ele[0] === "ownerid" || ele[0] === "_id"  || ele[0] === "__v" ){
            return <></>;
        }
        return (
            <td>{ele[1]}</td>
        )
      }
    const goToCreateForm =() => {
        window.location.replace("/createform")
    }
    const Record = (ele) => {
     return <tr>{Object.entries(ele).map(SingleRecord)}</tr>
     


    }
    return (
        <div>
           {/* {JSON.stringify(userInfo)}<br></br>
           {JSON.stringify(formInfo)}
           {myformInfo && JSON.stringify(myformInfo)} */}
           <br></br>
           <center>
               <div className="details-main-container">
               <div className="details-filter">
                
               </div>
               <div className="details-form">
                   {formInfo && <div className="search-box">
                      {searchOption === "" || searchOptionIgnore === "" ? (
                        <strong>Select Search Option</strong>
                      ):(
                        <input type="text" className="search-box-input"  onChange={(e) => setSearch(e.target.value)}></input>
                      )
                      }
                   </div> }
                <div className="column-search">
                {formInfo && Object.entries(formInfo.formschemaobj).map(FormAttributes)}
                </div>
               {formInfo ? (
                 <table className="form-table-head">
                 <tr>
                 {formInfo && Object.entries(formInfo.formschemaobj).map(FormHead)}
                 </tr>
                 {myformInfo && myformInfo.filter((val) => {
                     //console.log(val[searchOptionIgnore].toLowerCase()+"--"+search.toLowerCase())
                if (search === '')
                    return val;
                else if (val[searchOptionIgnore].toLowerCase().includes(search.toLowerCase())) {
                    
                    return val;
                }
                // else if (val.data.small_city.includes(search.toLowerCase())) {
                //     return val;
                // }
                // else if (val.data.small_state.includes(search.toLowerCase())) {
                //     return val;
                // }
                return null;
                 }).map(Record)}
             </table>
               ):(
                <button onClick={goToCreateForm} className="normal-btn">Start creating a Form</button>
               )}
               </div>
               </div>
           </center>
          
        </div>
    )
}
