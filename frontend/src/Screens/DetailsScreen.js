import React from 'react'
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyFormData } from '../actions/formActions';
// import AnalyticsIcon from '@material-ui/icons/Analytics';
export default function DetailsScreen() {
   
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [searchOption,setSearchOption] = useState("");
    const [sortOption,setSortOption] = useState("");
    const [startsWithColumnOption,setStartsWithColumnOption] = useState("");
    const [searchOptionIgnore,setSearchOptionIgnore] = useState("");
    const [sortOptionIgnore,setSortOptionIgnore] = useState("");
    const [startsWithColumnOptionIgnore,setStartsWithColumnOptionIgnore] = useState("");
    const [lettersSet,setLettersSet] = useState(null);
    const [letterSelected, setLetterSelected] = useState("");
    const [noOfRows, setNoOfRows] = useState(null);
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
        setStartsWithColumnOption("");
        setNoOfRows(null);

    }
    const sortOptions = (e) => {
        setSortOption(e.target.attributes.value.value.toLowerCase())
        setSortOptionIgnore(e.target.attributes.value.value)
        setSearchOption("");
        setStartsWithColumnOption("");
        setNoOfRows(null);

    }
    const startsWithColumnOptions = (e) => {
        var a = new Set();
        setStartsWithColumnOption(e.target.attributes.value.value.toLowerCase())
        setStartsWithColumnOptionIgnore(e.target.attributes.value.value)
        setSearchOption("");
        setSortOption("");
        setNoOfRows(null);
        myformInfo.forEach(ele => {
            
            a.add(ele[e.target.attributes.value.value].toLowerCase().slice(0,1))
        });
        setLettersSet(Array.from(a).sort());
    }
    
    const FormAttributes = (ele) => {
        if(ele[0] === "ownerid"){
            return <></>;
        }
        return (

            <span className={searchOption === ele[0].toLowerCase() ? "active" : "not-active"} onClick={searchOptions} value={ele[0]}>{ele[0]}</span>
        )
      }
      
    const SortFormAttributes = (ele) => {
        if(ele[0] === "ownerid"){
            return <></>;
        }
        
        return (

            <span style={{margin:"0 20px"}} onClick={sortOptions} className={sortOption === ele[0].toLowerCase() ? "active" : "not-active"}  value={ele[0]}>{ele[0]}</span>
        )
      }

    const StartsWithFormAttributes = (ele) => {
        if(ele[0] === "ownerid" || ele[0] === "Number"){
            return <></>;
        }
        else if(ele[1] === "String"){
            return (

                <span style={{margin:"0 20px"}} onClick={startsWithColumnOptions} className={startsWithColumnOption === ele[0].toLowerCase() ? "active" : "not-active"}  value={ele[0]}>{ele[0]}</span>
            )
        }
        
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
    const Letters = (ele) => {
     return <div value={ele} className={ele.toLowerCase() === letterSelected ? "active":"not-active"} onClick={letterChoice}>{ele.toUpperCase()}</div>;
    }
    const letterChoice= (e) => {
        setLetterSelected(e.target.attributes.value.value.toLowerCase())
        
    }
    const Record = (ele) => {
     return <tr>{Object.entries(ele).map(SingleRecord)}</tr>
     
    }
    const displayNoOfRows = (e) => {
        setNoOfRows(e.target.value);
        setSortOption("");
        setStartsWithColumnOption("");
        setSearchOption("");
    }
    return (
        <div>
          {console.log(noOfRows)}
           <center>
               <div className="details-main-container">
               {formInfo && <div className="details-filter">
                <div>
                    <h1>Applying Filters</h1>
                </div>
                <div >
                <div>
                    <h2>Sort by</h2>
                </div>
                <div className="column-search">
                {formInfo && Object.entries(formInfo.formschemaobj).map(SortFormAttributes)}
                </div>
                </div>
                <div>
                <div>
                    <h2>Starts With</h2>
                </div>
                <div className="column-search">
                {formInfo && Object.entries(formInfo.formschemaobj).map(StartsWithFormAttributes)}
                </div>
                </div>
                <div>
                <div>
                    <h2>Get First N Rows</h2>
                </div>
                <div className="column-search">
                <input type="number"  onChange={displayNoOfRows} ></input>
                </div>
                </div>
               </div>}
               <div className="starts-with-letter-div">
                   
                   {startsWithColumnOption && lettersSet && Array.from(lettersSet).map(Letters)}
                   
               </div>
               <div className="details-form">
                   {formInfo && <div className="search-box">
                      {searchOption === "" || searchOptionIgnore === "" ? (
                        <h2>Select Search Option</h2>
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
                 {/* <tr>
                 {formInfo && Object.entries(formInfo.formschemaobj).map(Statistics)}
                 </tr> */}
                 <tr>
                 {formInfo && Object.entries(formInfo.formschemaobj).map(FormHead)}
                 </tr>
                 
                 {sortOption === "" && startsWithColumnOption === "" && !noOfRows && myformInfo && myformInfo.filter((val) => {
                     //console.log(val[searchOptionIgnore].toLowerCase()+"--"+search.toLowerCase())
                if (search === '')
                    return val;
                else if (val[searchOptionIgnore].toLowerCase().includes(search.toLowerCase())) {
                    
                    return val;
                }
                
                return null;
                 }).map(Record)}
                 {sortOption !== "" && startsWithColumnOption === "" && !noOfRows && myformInfo && myformInfo.sort((a,b) =>  (a[sortOptionIgnore].toLowerCase() > b[sortOptionIgnore].toLowerCase()) ? 1 : -1)
                 .map(Record)}
                 {!noOfRows && myformInfo && startsWithColumnOption !== "" && searchOption === "" && sortOption === "" && myformInfo.filter((val) => {
                
                if (val[startsWithColumnOptionIgnore].toLowerCase().startsWith(letterSelected))
                    return val;
                
                
                return null;
                 }).map(Record)}
                 {noOfRows && myformInfo && myformInfo.slice(0,noOfRows).map(Record)}
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
