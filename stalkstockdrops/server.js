const mongoose = require("mongoose");
// const Newegg = require("./models/newegg");
const puppeteer = require("puppeteer");
const cheerio = require('cheerio');
var express = require("express");
const fs = require('fs');
var PORT = process.env.PORT || 3001;

// Initialize Express
var app = express();

// Configure middleware
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/items_db";
mongoose.connect(MONGODB_URI);

// Start the server
app.listen(PORT, function() {
  console.log("App listening on port " + PORT);
});
(async () => { 
  const readNewegg = async () => { 
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto(
    "https://www.newegg.com/p/pl?N=100007709%20601357282%208000&PageSize=96",
    {
      waitUntil: "networkidle2",
    }
  );


  // const $ = await cheerio.load('div.item-info > a[attr=href]');
  const itemListing = await page.$$eval("div.item-button-area > button", (a) =>
    a.map(({ innerText }) => innerText)
  );
  const itemName = await page.$$eval("a.item-title", (a) =>
  a.map(({ innerText }) => innerText)
);
  const itemAvail = await page.$$eval("a.item-title", (a) =>             
    a.map(({ href }) => href)
      // const $ = cheerio.load(
      // const hrefExtracted = $('a .item-title').attr('href')
      // console.log(hrefExtracted)
      //can ("div.item-info > a[attr=href]") I grab specific items from this? ie the p class="item-promo" <a href="https://www.newegg.com/msi-geforce-rtx-3070-rtx-3070-ventus-2x-oc/p/N82E16814137602?Item=N82E16814137602"
    );
  const itemPrice = await page.$$eval(".price-current", (a) =>
    a.map(({ innerText }) => innerText)
  );
  var listings = itemName.map((itemName, index) => { 
    return {
    item: itemName,
    inStock: itemListing[index],
    url: itemAvail[index],
    price: itemPrice[index]
    }
  })
  console.log(await listings);
  let data = JSON.stringify(listings);
fs.writeFileSync('./src/components/listings.json', data);
//   Newegg.updateMany(listings)
  await browser.close()
  return readNewegg()
  }
  
  await readNewegg()
}
)() 


// (async () => {
    
//     const url = 'https://api.bestbuy.com/v1/products((search=rtx&search=30)&categoryPath.id=abcat0507002)?apiKey=mzA3x5mAGRnx6uKtGdsPyEg4&sort=name.asc&show=addToCartUrl,name,url,onlineAvailability&facet=description&pageSize=100&format=json'

// })();
// const LIST_LINK_SELECTOR = await page.$(".item-cell > div > a");
// const LIST_STOCK_SELECTOR = await page.$(".item-cell > div > div.item-info > p > i");
// const LIST_PRICE_SELECTOR = await page.$(".item-cell > div > div.item-action > ul > li.price-current");
// const itemCell = await page.$('div.page-content > section > div:nth-child(1) > div > div.row-body > div:nth-child(1) > div > div > div.row-body > div > div > div.item-cells-wrap.border-cells.items-grid-view.four-cells.expulsion-one-cell')

// for (let i = 0; i <= listLength; i++) {
//     const titleArray = await page.evaluate((LIST_TITLE_SELECTOR) => {
//         return Array.from(document.querySelectorAll(LIST_TITLE_SELECTOR)).alt;
//     });
// }
