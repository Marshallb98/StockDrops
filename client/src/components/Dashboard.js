import React, { useEffect } from "react";
import Feed from "./Feed";
import { Container } from "react-bootstrap";
// If user does not have token it kicks them back to login page if they do it lets them see the feed
const Dashboard = ({ history }) => {
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      return history.push("/login");
    }
  }, []);

  return (
    <Container fluid>
      <Feed />
    </Container>
  );
};

export default Dashboard;
