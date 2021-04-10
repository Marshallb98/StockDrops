import React, { useState } from "react";
import { Form, Button } from "react-bootstrap"
import API from "../utils/API";

function Signup({history}) {
  const [registerEmail, setRegisterEmail] = useState()
  const [registerPassword, setRegisterPassword] = useState()
  const register = async () => {
    try {
      const { data } = await API.regUser({
        email: registerEmail,
        password: registerPassword,
      });
      sessionStorage.setItem("token", data.token);
      history.push('/dashboard');
    } catch(err) {
      console.log('err signing up ', err);
    }
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
         onClick={register}
        >
          Sign Up
        </Button>
      </Form>
    </div>
  );
}

export default Signup;