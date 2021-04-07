const express = require("express");
const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const DB = require("./models");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);  
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// app.post("/api/login", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) throw err;
//     if (!user) res.send("No User Exists");
//     else {
//       req.logIn(user, (err) => {
//         if (err) throw err;
//         res.send("Successfully Authenticated");
//         console.log(req.user);
//       });
//     }
//   })(req, res, next);
// });
// app.post("/api/register", (req, res) => {
//   User.findOne({ username: req.body.username }, async (err, doc) => {
//     if (err) throw err;
//     if (doc) res.send("User Already Exists");
//     if (!doc) {
//       const hashedPassword = await bcrypt.hash(req.body.password, 10);

//       const newUser = new User({
//         username: req.body.username,
//         password: hashedPassword,
//       });
//       await newUser.save();
//       res.send("User Created");
//     }
//   });
// });
// app.get("/user", (req, res) => {
//   res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
// });
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/react");

// Start the API server
app.listen(PORT, function () {
  console.log(`API Server now listening on PORT ${PORT}!`);
});

(async () => {
  const readNewegg = async () => {
    const browser = await puppeteer.launch({
      // headless: false,
    });
    const page = await browser.newPage();
    await page.goto(
      "https://www.newegg.com/p/pl?N=100007709%20601357282%208000&PageSize=96",
      {
        waitUntil: "networkidle2",
      }
    );

    // const $ = await cheerio.load('div.item-info > a[attr=href]');
    const itemListing = await page.$$eval(
      "div.item-button-area > button",
      (a) => a.map(({ innerText }) => innerText)
    );
    const itemName = await page.$$eval("a.item-title", (a) =>
      a.map(({ innerText }) => innerText)
    );
    const itemAvail = await page.$$eval(
      "a.item-title",
      (a) => a.map(({ href }) => href)
      // const $ = cheerio.load(#item_cell_14-932-371_21_0 > div > div.item-info > ul > li:nth-child(5) > strong
      // const hrefExtracted = $('a .item-title').attr('href')
      // console.log(hrefExtracted)
      //can ("div.item-info > a[attr=href]") I grab specific items from this? ie the p class="item-promo" <a href="https://www.newegg.com/msi-geforce-rtx-3070-rtx-3070-ventus-2x-oc/p/N82E16814137602?Item=N82E16814137602"
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
      let itemDetails = 
        {
          id: index,
          retailer: "Newegg",
          name: item,
          availability: itemListing[index],
          url: itemAvail[index],
          price: itemPrice[index],
          modelNumber: itemModel[index],
          thumbnail: itemImage[index],
        }
      return DB.Item.updateOne({name: itemDetails.name}, {
        id: itemDetails.index,
        retailer: itemDetails.retailer,
        name: itemDetails.name,
        availability: itemDetails.availability,
        url: itemDetails.url,
        price: itemDetails.price,
        modelNumber: itemDetails.modelNumber,
        thumbnail: itemDetails.thumbnail},)
            .catch((err) => {
              console.log(err);
            });;
    });
    await browser.close();
    return readNewegg();
  };

  await readNewegg();
})();
