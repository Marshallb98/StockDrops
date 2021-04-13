import React, { useState, useEffect, useRef } from "react";
import {
  ListGroup,
  Accordion,
  Card,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import API from "../utils/API";
import "../styles/feed.css";
import dayjs from "dayjs";
function Feed() {
  const [data, setData] = useState([]);
  
  const topRef = useRef();
  const bottomRef = useRef();
 
  const getData = () => {
    API.getItems({})
      // readBestBuy()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
    setTimeout(getData, 2500);
  };

  useEffect(() => {
    getData();
  }, []);

 

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
 
  const scrollToTop = () => {
    topRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  function checkStock(thisItem) {
    if (thisItem.availability === "Add To Cart ") {
      //This is Newegg In stock!
      let stock = (
        <>
          <div className="first-Line">
            <span className={thisItem.retailer}>{thisItem.retailer}</span>{" "}
            <span className="updateSpan">{dayjs().format("hh:mm:ss")}</span>{" "}
            <span className="priceDiv"> {thisItem.price}</span>{" "}
            <a
              id="btnColor"
              className="btn btn-success items-button"
              href={thisItem.url}
            >
              {" "}
              ADD TO CART!
            </a>{" "}
          </div>
          <div className="item-name">
            <a href={thisItem.url}>{thisItem.name}</a>
          </div>
        </>
      );
      return stock;
    } else if (thisItem.availability === "true") {
      //This is Bestbuy Instock
      let stock = (
        <>
          <div className="first-Line">
            <span className={thisItem.retailer}>{thisItem.retailer}</span>{" "}
            <span className="updateSpan">{dayjs().format("hh:mm:ss")}</span>{" "} $
            <span className="priceDiv"> {thisItem.price}</span>{" "}
            <a
              id="btnColor"
              className="btn btn-success items-button"
              href={thisItem.url}
            >
              {" "}
              ADD TO CART!
            </a>{" "}
          </div>
          <div className="item-name">
            <a href={thisItem.url}>{thisItem.name}</a>
          </div>
        </>
      );
      return stock;
    } else if (thisItem.availability === "false") {
      //This is Bestbuy OOS
      let stock = (
        <>
          <div className="first-Line">
            <span className={thisItem.retailer}>{thisItem.retailer}</span>{" "}
            <span className="updateSpan">{dayjs().format("hh:mm:ss")}</span> $
            <span className="priceDiv"> {thisItem.price}</span>{" "}
            <a
              id="btnColor"
              className="btn btn-danger items-button"
              href={thisItem.url}
            >
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
    } else {
      //This is Newegg OOS
      let stock = (
        <>
          <div className="first-Line">
            <span className={thisItem.retailer}>{thisItem.retailer}</span>{" "}
            <span className="updateSpan">{dayjs().format("hh:mm:ss")}</span>{" "}
            <span className="priceDiv"> {thisItem.price}</span>
            <a
              id="btnColor"
              className="btn btn-danger items-button"
              href={thisItem.url}
            >
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
        <Container fluid className="left-container">
            <div className="item-name-parent autoscroll-container">
              <ListGroup className="scroll-list">
                <button
                  className="scrollBtns"
                  type="button"
                  ref={topRef}
                  onClick={scrollToBottom}
                >
                  Scroll To Bottom
                </button>
                {data.map((item, index) => (
                  <ListGroup.Item className="list-group-name" key={index}>
                    {checkStock(item)}
                  </ListGroup.Item>
                ))}
                <button
                  type="button"
                  className="scrollBtns"
                  onClick={scrollToTop}
                >
                  Scroll To Top
                </button>
              </ListGroup>
              <div ref={bottomRef}></div>
            </div>
        </Container>
        <Container fluid className="right-container">
            <Accordion defaultActiveKey="0">
              {" "}
              <Card>
                <Accordion.Toggle
                  as={Card.Header}
                  className="cardHead"
                  eventKey="0"
                >
                  <h3> Learn about the project here!</h3>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body className="cardBody">
                    This website was developed to help people get a chance at
                    snagging an item that is hard to come by. Today most of
                    these items are computer chip related products which are
                    used in a vast amount of items such as vehicles, consoles,
                    graphics cards, and computer processors. There are many
                    opinions on why one of the most sought after items on that
                    list, graphics cards are so hard to come by, and there is no
                    simple answer there are actually a lot of reasons as to
                    this. Covid-19 has forced a lot of people to work from home,
                    which makes people work off their home computer, they will
                    end up getting a new computer because they can now write it
                    off for taxes, cryptocurrency is booming so mining crypto is
                    at an all time profitability, release of the new generation
                    of consoles has pull a lot of the already limited man power
                    to that and the car manufacturers also have put a huge
                    amount of orders into these factories that make the silicon
                    parts. So there really is no "one" factor that makes these
                    products so hard to find, its just everything combined,
                    Thats why I made this website, to make it just a little bit
                    easier for the average person to find these items. This
                    website uses web scraping and api calls to collect data from
                    these sites through a quick calls initiating every few
                    seconds.{" "}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle
                  as={Card.Header}
                  className="cardHead"
                  eventKey="1"
                >
                  Guides and Resources
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body className="cardBody">
                    {" "}
                    <h5>
                      {" "}
                      For any store that you wish to get an item from it is
                      highly suggested if available to create an account with
                      your payment information and shipping address saved.
                      Remember that there are a huge amount of people trying to
                      get these cards so don't get down if you don't get it on
                      your first try!
                    </h5>
                    <ul>
                      <li>
                        <a href="https://docs.google.com/document/d/1u2if0UWwVrPbrVDDCtjCO9rQ78xHt0lPwaEi_hylrGI/edit?usp=sharing">
                          Zotac Guide - Written by razaclas{" "}
                        </a>
                      </li>

                      <li>
                        {" "}
                        <a href="https://docs.google.com/document/d/1qtXK9YTpBndGsTmEkq8AkgfMBnYsa5Zy_SMydpqS4UM/edit">
                          Amazon Guide{" "}
                        </a>
                      </li>
                    </ul>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle
                  as={Card.Header}
                  className="cardHead"
                  eventKey="2"
                >
                  Watch some Videos!
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <Card.Body className="cardBody">
                    <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/videoseries?list=PLx7UW6qQ6sGRtJkJp4Y1QfwIBM_h_9dLj"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle
                  as={Card.Header}
                  className="cardHead"
                  eventKey="3"
                >
                  Watch a Live Stream!
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="3">
                  <Card.Body className="cardBody">
                    <iframe
                      src="https://player.twitch.tv/?channel=falcodrin&parent=https://stalkstockdrops.herokuapp.com"
                      frameborder="0"
                      allowfullscreen="true"
                      scrolling="no"
                      height="378"
                      width="620"
                    ></iframe>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
        </Container>
      </Row>
    </div>
  );
}

export default Feed;
