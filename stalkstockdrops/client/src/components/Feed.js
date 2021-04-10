import React, { useState, useEffect, useRef } from "react";
import { ListGroup, Accordion, Card, Row, Col } from "react-bootstrap";
import API from "../utils/API";
import "./feed.css";
// import axios from "axios"
// const API_KEY = process.env.BB_API_KEY;
function Feed() {
  const [data, setData] = useState([]);
  const [alertData, setAlertData] = useState([]);
  // const [ bbdata, setBBData ]= useState([]);

  const getData = () => {
    API.getItems({})
      // readBestBuy()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
    setTimeout(getData, 10000);
  };

  useEffect(() => {
    getData();
  }, []);

  const bottomRef = useRef();
  const topRef = useRef();
  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
    // scrollToTop() 
  };
  // const scrollToTop = () => {
  //   topRef.current.scrollIntoView({
  //     behavior: "smooth",
  //     block: "start",
  //   });
  // };


  function alertInStock(alertItem) {
    const alertFormat = (
      <div>
        <ListGroup.Item>
          {" "}
          {alertItem.retailer} - Last Updated at UTC(0) -{" "}
          {alertItem.updatedAt}{" "}
        </ListGroup.Item>
        <ListGroup.Item>
          {" "}
          PRICE {alertItem.price} + AVAILABILITY{" "}
          <a id="btnColor" class="btn btn-danger" href={alertItem.url}>
            {" "}
            ADD TO CART!{" "}
          </a>{" "}
        </ListGroup.Item>
      </div>
    );
    setAlertData(alertFormat);
    return alertData;
  }

  function checkStock(thisItem) {
    if (thisItem.availability === "ADD TO CART") {
      let time = thisItem.splice(11,)
      let stock = (
        <>
          <div>
            <span className={thisItem.retailer}>{thisItem.retailer}</span> - Updated at
            UTC(0) - <span className="updateSpan">{thisItem.updatedAt}</span>
            {" "}
            {thisItem.price}{" "}
          <a id="btnColor" className="btn btn-success" href={thisItem.url}>
            {" "}
           ADD TO CART!
          </a>{" "}
          </div>
          <div className="item-name">
            <a href={thisItem.url}>{thisItem.name}</a>
          </div>
        
        </>
      );
      alertInStock(thisItem);
      return stock;
    }else if (thisItem.availability === "true") {
      let stock = (
        <>
          <div>
            <span className={thisItem.retailer}>{thisItem.retailer}</span> - Updated at
            UTC(0) - <span className="updateSpan">{thisItem.updatedAt}</span>
            {" "}
            ${thisItem.price}{" "}
          <a id="btnColor" className="btn btn-success" href={thisItem.url}>
            {" "}
            ADD TO CART!
          </a>{" "}
          </div>
          <div className="item-name">
            <a href={thisItem.url}>{thisItem.name}</a>
          </div>
        
        </>
      );
      alertInStock(thisItem);
      return stock;
    } 
    else if (thisItem.availability === "false") {
      let stock = (
        <>
          <div>
            <span className={thisItem.retailer}>{thisItem.retailer}</span> - Updated at
            UTC(0) - <span className="updateSpan">{thisItem.updatedAt}</span>
            {" "}
            ${thisItem.price}{" "}
          <a id="btnColor" className="btn btn-danger" href={thisItem.url}>
            {" "}
            OUT OF STOCK!
          </a>{" "}
          </div>
          <div className="item-name">
            <a href={thisItem.url}>{thisItem.name}</a>
          </div>
        
        </>
      );
      return stock;
    }
     else {
      let stock = (
        <>
        <div>
          <span className={thisItem.retailer}>{thisItem.retailer}</span> - Updated at
          UTC(0) - <span className="updateSpan">{thisItem.updatedAt}</span>
          {" "}
          {thisItem.price}{" "}
        <a id="btnColor" className="btn btn-danger" href={thisItem.url}>
          {" "}
          OUT OF STOCK!
        </a>{" "}
        </div>
        <div className="item-name">
          <a href={thisItem.url}>{thisItem.name}</a>
        </div>

      </>
      );

      return stock;
    }
  }

  return (
    <div>
      <Row>
        {/* <Col>
          <Accordion defaultActiveKey="0">
            {" "}
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                <h3> Learn about the project here!</h3>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  This website was developed to help people get a chance at
                  snagging an item that is hard to come by. Today most of these
                  items are computer chip related products which are used in a
                  vast amount of items such as vehicles, consoles, graphics
                  cards, and computer processors. There are many opinions on why
                  one of the most sought after items on that list, graphics
                  cards are so hard to come by, and there is no simple answer
                  there are actually a lot of reasons as to this. Covid-19 has
                  forced a lot of people to work from home, which makes people
                  work off their home computer, they will end up getting a new
                  computer because they can now write it off for taxes,
                  cryptocurrency is booming so mining crypto is at an all time
                  profitability, release of the new generation of consoles has
                  pull a lot of the already limited man power to that and the
                  car manufacturers also have put a huge amount of orders into
                  these factories that make the silicon parts. So there really
                  is no "one" factor that makes these products so hard to find,
                  its just everything combined, Thats why I made this website,
                  to make it just a little bit easier for the average person to
                  find these items. This website uses web scraping and api calls
                  to collect data from these sites through a quick calls
                  initiating every few seconds.{" "}
                </Card.Body>
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
        </Col> */}
        <Col>
          <div className="tab-content item-name-parent autoscroll-container" ref={topRef}>
            <ListGroup className="scroll-list">
              {data.map((item, index) => (
                <ListGroup.Item className="list-group-name" key={index}>
                
                    {checkStock(item)}
                
                </ListGroup.Item>
              ))}
            </ListGroup>
            <div ref={bottomRef}></div>
          </div>
        </Col>
        <Col>
          <ListGroup id="alertAppend">
            {" "}
            <button type="button" onClick={scrollToBottom}>
              Scroll To Bottom
            </button>
            <h2> Items that come in stock will Alert here!</h2>
            {}
            <ListGroup.Item>{alertData} </ListGroup.Item>
            <ListGroup.Item>2</ListGroup.Item>
            <ListGroup.Item>3</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}

export default Feed;