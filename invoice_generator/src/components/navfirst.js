import React from "react";
import { Link, Route } from "react-router-dom";
import img1 from "./logo.png";
import Homepage from "./homepage";

function Navfirst() {
  return (
    <div>
      <div
        class="navbar navbar-expand-lg bg-dark text-light"
        style={{ marginBottom: "10px", position: "relative", top: "0" }}
      >
        <img src={img1} height="80px" style={{ marginLeft: "50px" }} />
        <h3 style={{ marginLeft: "10px", fontFamily: "sans-serif" }}>
          INVOICE
        </h3>
        <span style={{ marginLeft: "960px" }}>
          <a href="/" class="btn">
            <i class="fa text-light fa-home h1" />
          </a>
        </span>
        <a href="/login" class="btn btn-warning" style={{ marginLeft: "10px" }}>
          Login
        </a>
        <a href="/Reg" class="btn btn-success" style={{ marginLeft: "10px" }}>
          Register
        </a>
      </div>
    </div>
  );
}

export default Navfirst;
