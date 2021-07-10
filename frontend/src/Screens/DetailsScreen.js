import React from 'react'
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyFormData } from '../actions/formActions';
export default function DetailsScreen() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [searchOption,setSearchOption] = useState("");
    const [sortOption,setSortOption] = useState("");
    const [searchOptionIgnore,setSearchOptionIgnore] = useState("");
    const [sortOptionIgnore,setSortOptionIgnore] = useState("");
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;
    const checkFormCreated = useSelector((state) => state.checkFormCreated);
    const { formInfo} = checkFormCreated;
    const getMyDataForm = useSelector((state) => state.getMyFormData);
    const { myformInfo} = getMyDataForm;
    /* Filters*/
    const [sort,setSort] = useState("");
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
        setSortOption("");
    }
    const sortOptions = (e) => {
        setSortOption(e.target.attributes.value.value.toLowerCase())
        setSortOptionIgnore(e.target.attributes.value.value)
        setSearchOption("");
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
      
    const SortFormAttributes = (ele) => {
        if(ele[0] === "ownerid"){
            return <></>;
        }
        //alert(typeof(ele[0]))
        return (

            <span  onClick={sortOptions} className={sortOption === ele[0].toLowerCase() ? "active" : "not-active"}  value={ele[0]}>{ele[0]}</span>
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
           {/* {sortOption}
           {sortOptionIgnore} */}
           <br></br>
           <center>
               <div className="details-main-container">
               <div className="details-filter">
                <div>
                    <h1>Applying Filters</h1>
                </div>
                <div>
                <div>
                    <h2>Sort by</h2>
                </div>
                <div className="column-search">
                {formInfo && Object.entries(formInfo.formschemaobj).map(SortFormAttributes)}
                </div>
                </div>
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
                 {sortOption === "" && myformInfo && myformInfo.filter((val) => {
                     //console.log(val[searchOptionIgnore].toLowerCase()+"--"+search.toLowerCase())
                if (search === '')
                    return val;
                else if (val[searchOptionIgnore].toLowerCase().includes(search.toLowerCase())) {
                    
                    return val;
                }
                
                return null;
                 }).map(Record)}
                 {sortOption !== "" && myformInfo && myformInfo.sort((a,b) =>  (a[sortOptionIgnore] > b[sortOptionIgnore]) ? 1 : -1)
                 .map(Record)}
                 
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
