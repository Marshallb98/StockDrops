require("dotenv").config();
const express = require("express");
const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const DB = require("./models");
const cors = require("cors");
const readBestBuy = require("./api/bestbuy")
setTimeout(readBestBuy, 10000);
const path = require('path');
(async () => {
  try {
    // Connect to the Mongo DB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost/react",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    // Define middleware here
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(
      cors({
        origin: "http://localhost:3000", // <-- location of the react app were connecting to
        credentials: true,
      })
    );

    // Add routes, both API and view
    app.use(routes);

    // Serve up static assets (usually on heroku)
    if (process.env.NODE_ENV === "production") {
      app.use(express.static("client/build"));
      // If no API routes are hit, send the React app
      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "./client/build/index.html"));
      });
    }

    // Start the API server
    app.listen(PORT, function () {
      console.log(`API Server now listening on PORT ${PORT}!`);
    });
    // Start Newegg Webscraping Function and sends update to Items collection, and then restarts
    
    (async () => {
      
      const readNewegg = async () => {
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.goto(
          "https://www.newegg.com/p/pl?N=100007709%20601357282%208000&PageSize=96",
          {
            waitUntil: "networkidle2",
          }
        );

        const itemListing = await page.$$eval(
          "div.item-button-area > button",
          (a) => a.map(({ innerText }) => innerText)
        );
        const itemName = await page.$$eval("a.item-title", (a) =>
          a.map(({ innerText }) => innerText)
        );
        const itemAvail = await page.$$eval("a.item-title", (a) =>
          a.map(({ href }) => href)
        );
        const itemPrice = await page.$$eval(".price-current", (a) =>
          a.map(({ innerText }) => innerText)
        );

        const itemModel = await page.$$eval(
          "div.item-info > ul > li:nth-child(5)",
          (a) => a.map(({ innerText }) => innerText)
        );
        const itemImage = await page.$$eval(".item-cell > div > a > img", (a) =>
          a.map(({ src }) => src)
        );
        const data = await itemName.map((item, index) => {
          let itemDetails = {
            id: index,
            retailer: "Newegg",
            name: item,
            availability: itemListing[index],
            url: itemAvail[index],
            price: itemPrice[index],
            modelNumber: itemModel[index],
            thumbnail: itemImage[index],
          };
          return DB.Item.updateOne(
            { name: itemDetails.name },
            {
              id: itemDetails.index,
              retailer: itemDetails.retailer,
              name: itemDetails.name,
              availability: itemDetails.availability,
              url: itemDetails.url,
              price: itemDetails.price,
              modelNumber: itemDetails.modelNumber,
              thumbnail: itemDetails.thumbnail,
            },
            {upsert: true}
          ).catch((err) => {
            console.log(err);
          });
        });
        await browser.close();
        return readNewegg();
      };

      await readNewegg();
    })();
  } catch (err) {
    console.log("error connecting to DB", err);
  }

  
})();
