import React, { useState, useEffect } from "react";
import { ListGroup, Accordion, Card, Row, Col } from "react-bootstrap";
import API from "../utils/API";
// import axios from "axios"
// const API_KEY = process.env.BB_API_KEY;
function Feed() {
  const [data, setData] = useState([]);
  // const [ bbdata, setBBData ]= useState([]);

  const getData = () => {
    API.getItems({})
      // readBestBuy()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  setInterval(getData, 10000);
  // const readBestBuy = () => {
  //    const url = `https://api.bestbuy.com/v1/products((search=rtx&search=30)&categoryPath.id=abcat0507002&regularPrice>350)?apiKey=${API_KEY}&sort=inStoreAvailability.asc&show=addToCartUrl,itemUpdateDate,inStoreAvailability,thumbnailImage,inStoreAvailabilityText,longDescription,manufacturer,mobileUrl,modelNumber,name,onlineAvailability,onlineAvailabilityText,onSale,regularPrice,relatedProducts.sku,salePrice,sku,url&pageSize=100&format=json`;
  //    axios.get(url).then((response) => {
  //      console.log(response.data);
  //      const dataMap = response.data.products;
  //      const bbdata = dataMap.map((item, index) => {
  //        let itemDetails = {
  //          id: item.sku,
  //          retailer: "BestBuy",
  //          name: item.name,
  //          availability: item.onlineAvailability,
  //          url: item.url,
  //          cartUrl: item.addToCartUrl,
  //          mobileUrl: item.mobileUrl,
  //          price: item.salePrice,
  //          modelNumber: item.modelNumber,
  //          thumbnail: item.thumbnailImage,
  //        };
  //       return itemDetails
  //      }
  //        ).catch((error) => {
  //          console.log(error);
  //        });
  //      });
  //      return setBBData(bbdata)
  //    }
  // setInterval(readBestBuy, 10000);
  // console.log(bbdata)
function alertInStock(alertItem) {

} 

  function checkStock(thisItem) {
    if (thisItem.availability === "ADD TO CART") {
      let stock = (
        <ListGroup.Item>
          PRICE- {thisItem.price} + AVAILABILITY{" "}
          <a id="btnColor" class="btn btn-danger" href={thisItem.url}>
            {" "}
            ADD TO CART!{" "}
          </a>{" "}
        </ListGroup.Item>
      );

      return stock;
    } else {
      let stock = (
        <ListGroup.Item>
          PRICE- {thisItem.price} + AVAILABILITY{" "}
          <a id="btnColor" class="btn btn-danger" href={thisItem.url}>
            {" "}
            OUT OF STOCK!
          </a>{" "}
        </ListGroup.Item>
      );

      return stock;
    }
  }

  return (
    <div>
      <Row>
        <Col>
          <Accordion defaultActiveKey="0">
            {" "}
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
               <h3> Learn about the project here!</h3>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>This website was developed to help people get a chance at snagging an item that is hard to come by. Today most of these items are computer chip related products which are used in a vast amount of items such as vehicles, consoles, graphics cards, and computer processors.
                  There are many opinions on why one of the most sought after items on that list, graphics cards are so hard to come by, and there is no simple answer there are actually a lot of reasons as to this. Covid-19 has forced a lot of people to work from home, 
                  which makes people work off their home computer, they will end up getting a new computer because they can now write it off for taxes, cryptocurrency is booming so mining crypto is at an all time profitability, release of the new generation of consoles 
                  has pull a lot of the already limited man power to that and the car manufacturers also have put a huge amount of orders into these factories that make the silicon parts. So there really is no "one" factor that makes these products so hard to find, its just everything combined,
                  Thats why I made this website, to make it just a little bit easier for the average person to find these items. This website uses web scraping and api calls to collect data from these sites through a quick calls initiating every few seconds. </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                Guides
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>Hello! I'm another body</Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
        <Col>
        <div className="tab-content">
          {data.map((item) => (
            <ListGroup  key={item.id }className="tab-pane fade show active">
              <ListGroup.Item> {item.retailer} {" "}
              - Last Updated at UTC(0) - {item.updatedAt.slice(11, 19)}{" "}</ListGroup.Item>
              <ListGroup.Item> {item.name.slice(0, 45)}</ListGroup.Item>

              {checkStock(item)}
            </ListGroup>
          ))}
          </div>
        </Col>
        <Col>
          <ListGroup>
            {" "}
            <h2> Items that come in stock will Alert here!</h2>
            <ListGroup.Item>1 </ListGroup.Item>
            <ListGroup.Item>2</ListGroup.Item>
            <ListGroup.Item>3</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}

export default Feed;
