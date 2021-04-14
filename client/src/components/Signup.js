import React, { useState } from "react";
import { Form, Button } from "react-bootstrap"
import API from "../utils/API";
import "../styles/form.css";
function Signup({history}) {
  const [registerEmail, setRegisterEmail] = useState()
  const [registerPassword, setRegisterPassword] = useState()
  const register = async () => {
    try {
      const { data } = await API.regUser({
        email: registerEmail,
        password: registerPassword,
      });
      alert("User Created!");
      sessionStorage.setItem("token", data.token);
      history.push('/dashboard');
    } catch(err) {
      console.log('err signing up ', err);
    }
  }

  return (
    <div className="Login">
       <div className="formContainer">
      <Form >
        <h2 style={{marginBottom: "30px"}}>Sign Up!</h2>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
          placeholder="Enter Email Here"
            autoFocus
            type="email"
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
           placeholder="Enter Password Here"
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
    </div>
  );
}

export default Signup;