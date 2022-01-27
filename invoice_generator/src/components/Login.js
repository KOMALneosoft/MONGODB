import React, { useState } from "react";
import { login } from "../config/MyService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navfirst from "./navfirst";

/////////////////////////////////////////////////////
export default function Login(props) {
  let navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
  });
  //////////////////////////////////////////////////////////
  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  const postRegis = (event) => {
    event.preventDefault();
    login(state).then((res) => {
      console.log(res.data.err);
      if (res.data.err == 0) {
        localStorage.setItem("_token", res.data.token);
        localStorage.setItem("userdetails", state.email);
        alert(res.data.msg);
        navigate("/gen");
      } else if (res.data.err == 1) {
        console.log(res.data);
        alert(res.data.msg);
      } else {
        alert("Connection Lost!");
      }
    });
  };
  return (
    <div>
      <Navfirst />
      <div
        className="jumbotron row text-light bg-dark"
        style={{
          marginLeft: "480px",
          width: "600px",
          alignSelf: "center",
          marginTop: "20px",
          height: "300px",
        }}
      >
        <h1 className="text-center text-warning">
          <i class="fa fa-user 2x" />
          Login
        </h1>
        <form method="post" onSubmit={postRegis}>
          Email:
          <input
            className="form-control"
            type="text"
            placeholder="Enter Email"
            name="email"
            aria-label="default input example"
            onChange={handler}
          />
          Password:
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            name="password"
            placeholder="Enter Password"
            onChange={handler}
          />
          <button
            type="submit"
            class="btn btn-success"
            style={{
              width: "100px",
              marginLeft: "50px",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          >
            Log in
          </button>
          <br />
        </form>

        <br />
        <p className="text-center">
          If Not Registered, <Link to="/Reg">Register Here</Link>
        </p>
      </div>
    </div>
  );
}
