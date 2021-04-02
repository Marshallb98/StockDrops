import React, { useState, useEffect } from "react";

function LeftCol() {
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
        <div className="leftCol">
     {
       data && data.length>0 && data.map((listings)=><p>{listings.inStock}</p>)
     }
    </div>
  );
}

export default LeftCol;
