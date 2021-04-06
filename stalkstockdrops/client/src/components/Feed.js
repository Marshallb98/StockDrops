import { MongooseDocument } from "mongoose";
import React, { useState, useEffect } from "react";
import API from "../utils/API"
function Feed() {
    const [ data, setData ]= useState([]);

    const getData=()=>{
      API.getItems({})
      .then(res => 
        setData(res.data)
        )
        .catch(err => console.log(err));
      }

      useEffect(()=>{
        getData()
      },[])


      setInterval(getData, 5000);

    function  checkStock(thisItem){
        if (thisItem === "ADD TO CART" ){
          let stock = "IN STOCK"
          return stock
        }
        else {
          let stock = "OUT OF STOCK"
          return stock
        }
        
      }

    return (
        <div className="Feed">
     {
       data && data.length>0 && data.map((item)=><ul id="listItems">Updated at UTC(0) - {item.updatedAt.slice(11,  19)}  {item.name} PRICE-{item.price}  AVAILABILITY <a href={item.url}>{checkStock(item.availability)}</a></ul>)
      }
    </div>
  );
}

export default Feed;
