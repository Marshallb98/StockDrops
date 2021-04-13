const db = require("../models")
const axios = require("axios")


 const readBestBuy = () => {


    let API_KEY = process.env.BB_API_KEY
    const url = `https://api.bestbuy.com/v1/products((search=rtx&search=30)&categoryPath.id=abcat0507002&regularPrice>350)?apiKey=${API_KEY}&sort=inStoreAvailability.asc&show=addToCartUrl,itemUpdateDate,inStoreAvailability,thumbnailImage,inStoreAvailabilityText,longDescription,manufacturer,mobileUrl,modelNumber,name,onlineAvailability,onlineAvailabilityText,onSale,regularPrice,relatedProducts.sku,salePrice,sku,url&pageSize=100&format=json`;
    axios.get(url).then((response) => {
      const dataMap =  response.data.products;
      try{
       const bbdata = dataMap.map((item) => {
         let itemDetails = {
           id: item.sku,
           retailer: "BestBuy",
           name: item.name,
           availability: item.onlineAvailability,
           url: item.url,
           cartUrl: item.addToCartUrl,
           mobileUrl: item.mobileUrl,
           price: item.salePrice,
           modelNumber: item.modelNumber,
           thumbnail: item.thumbnailImage,
          };
          // return itemDetails
          // throw(err)
          // return item
          return db.Item.updateOne(
            { name: itemDetails.name },
            {
              id: itemDetails.sku,
              retailer: itemDetails.retailer,
              name: itemDetails.name,
              availability: itemDetails.availability,
              url: itemDetails.url,
              cartUrl: itemDetails.addToCartUrl,
              mobileUrl: itemDetails.mobileUrl,
              price: itemDetails.price,
              modelNumber: itemDetails.modelNumber,
              thumbnail: itemDetails.thumbnail,
            },
            {upsert: true}
            ).catch((err) => {
              console.log(err)
            })
          }
          )}catch(err){
            console.log(err)
          }
    })
    setTimeout(readBestBuy, 10000);      
      }
      
      module.exports = readBestBuy