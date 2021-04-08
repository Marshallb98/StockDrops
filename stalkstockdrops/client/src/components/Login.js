import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import API from "../utils/API";

function Login({ history }) {
  const [loginEmail, setLoginEmail] = useState();
  const [loginPassword, setLoginPassword] = useState();

  const login = async () => {
    try {
      const { data } = await API.loginUser({
        email: loginEmail,
        password: loginPassword,
      });
      sessionStorage.setItem("token", data.token);
      history.push("/dashboard");
    } catch (err) {
      console.log("err loggin in ", err);
    }
  };

  return (
    <div className="Login">
      <Form>
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
        <Button block size="lg" onClick={login}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
