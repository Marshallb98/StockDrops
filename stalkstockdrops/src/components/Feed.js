import React, { useState, useEffect } from "react";
// const listings = require('./listings.json')
// let data = JSON.parse(listings)
// const listItems = data.map((items) =>
// <li>{items}</li>
function Main() {
    const [data,setData]=useState([]);
    const getData=()=>{
    fetch('listings.json'
        ,{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }
        )
          .then(function(response){
            console.log(response)
            return response.json();
          })
          .then(function(myJson) {
            console.log(myJson);
            setData(myJson)
          });
      }

      useEffect(()=>{
        getData()
      },[])




    return (
        <div className="feed">
     {
       data && data.length>0 && data.map((item)=><p>{item.item}</p>)
     }
    </div>
  );
}

export default Main;
