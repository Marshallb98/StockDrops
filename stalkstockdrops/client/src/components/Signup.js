import React, { Component, useState } from "react";
import { Form, Button } from "react-bootstrap"
import API from "../utils/API";
// import { Link } from "react-router-dom";
// import axios from "axios";

function Signup() {
  const [registerEmail, setRegisterEmail] = useState()
  const [registerPassword, setRegisterPassword] = useState()
  const register = () => {
    API.regUser({
      email: registerEmail,
        password: registerPassword
    
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
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
        </Form.Group>
        <Button 
        block size="lg"
         type="submit"
         onClick={register}
        >
          Sign Up
        </Button>
      </Form>
    </div>
  );
}

export default Signup;