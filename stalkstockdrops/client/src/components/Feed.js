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


      setInterval(getData, 10000);

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
        <div>
     {
       data.map((item, i)=><ul key={i} id="listItems"> {item.retailer} UTC(0) - {item.updatedAt.slice(11,  19)}  {item.name.slice(0,  45)} PRICE-{item.price}  AVAILABILITY <a href={item.url}>{checkStock(item.availability)}</a></ul>)
      }
    </div>
  );
}

export default Feed;
