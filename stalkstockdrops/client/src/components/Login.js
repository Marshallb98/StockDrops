import React, { Component, useState } from "react";
import { Form, Button } from "react-bootstrap"
import API from "../utils/API";
// import { Link } from "react-router-dom";


function Login() {
  const [loginEmail, setLoginEmail] = useState()
  const [loginPassword, setLoginPassword] = useState()
  const login = () => {
    API.loginUser({
        email: loginEmail,
        password: loginPassword
      }).then((res) => console.log(res))
  }
  
  return (
    <div className="Login">
      <Form >
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </Form.Group>
        <Button 
        block size="lg"
         type="submit"
         onClick={login}
        >
          Sign Up
        </Button>
      </Form>
    </div>
  );
}


export default Login;