import React, { useState, useEffect } from "react";
import "../styles/Feed.css"

function Feed() {
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
        <div className="Feed">
     {
       data && data.length>0 && data.map((item)=><ul id="listItems">{item.item} PRICE-{item.price} VIEW STOCKS - <a href="https://www.newegg.com/">{item.inStock}</a></ul>)
      }
    </div>
  );
}

export default Feed;
