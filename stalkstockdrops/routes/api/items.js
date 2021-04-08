require("dotenv").config();
const router = require("express").Router();
const itemsController = require("../../controllers/itemsController");
const axios = require("axios");
const DB = require("../../models/");
router.route("/").get(itemsController.findAll);
const API_KEY = process.env.BB_API_KEY;
const readBestBuy = async () => {
  console.log(API_KEY);
  const url = `https://api.bestbuy.com/v1/products((search=rtx&search=30)&categoryPath.id=abcat0507002&regularPrice>350)?apiKey=${API_KEY}&sort=inStoreAvailability.asc&show=addToCartUrl,itemUpdateDate,inStoreAvailability,thumbnailImage,inStoreAvailabilityText,longDescription,manufacturer,mobileUrl,modelNumber,name,onlineAvailability,onlineAvailabilityText,onSale,regularPrice,relatedProducts.sku,salePrice,sku,url&pageSize=100&format=json`;
  axios.get(url).then((response) => {
    console.log(response.data);
    const dataMap = response.data.products;
    const data = dataMap.map((item, index) => {
      let itemDetails = {
        id: item.sku[index],
        retailer: "BestBuy",
        name: item.name[index],
        availability: item.onlineAvailability[index],
        url: item.url[index],
        cartUrl: item.addToCartUrl[index],
        mobileUrl: item.mobileUrl[index],
        price: item.salePrice[index],
        modelNumber: item.modelNumber[index],
        thumbnail: item.thumbnailImage[index],
      };
      return DB.Item.updateOne(
        { name: itemDetails.name },
        {
          id: itemDetails.id,
          retailer: itemDetails.retailer,
          name: itemDetails.name,
          modelNumber: itemDetails.modelNumber,
          url: itemDetails.url,
          cartUrl: itemDetails.cartUrl,
          mobileUrl: itemDetails.mobileUrl,
          price: itemDetails.price,
          availability: itemDetails.availability,
          thumbnail: itemDetails.thumbnail,
        }
      ).catch((error) => {
        console.log(error);
      });
    });
    return readBestBuy(API_KEY);
  });
  return console.log("hello");
};
readBestBuy(API_KEY);

module.exports = router;
