import React, { useState, useEffect } from "react";

function RightCol() {
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
        <div className="RightCol">
     {
       data && data.length>0 && data.map((item)=><p>{item.price}</p>)
     }
    </div>
  );
}

export default RightCol;
