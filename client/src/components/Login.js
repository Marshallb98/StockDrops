import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import API from "../utils/API";
import "../styles/form.css";
function Login({ history }) {
  const [loginEmail, setLoginEmail] = useState();
  const [loginPassword, setLoginPassword] = useState();

  const login = async () => {
    try {
      const { data } = await API.loginUser({
        email: loginEmail,
        password: loginPassword,
      });
      alert("Log in Successful!");
      sessionStorage.setItem("token", data.token);
      history.push("/dashboard");
    } catch (err) {
      console.log("err loggin in ", err);
    }
  };

  return (
    <div className="Login">
      <div className="formContainer">
        <h2 style={{ marginBottom: "30px" }}>login!</h2>
        <Form>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              placeholder="Enter Email Here"
              type="email"
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password Here"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" onClick={login}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
