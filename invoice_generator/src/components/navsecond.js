import React from "react";
import { Link, Route } from "react-router-dom";
import img1 from "./logo.png";

function Navfirst() {
  return (
    <div>
      <div
        class="navbar navbar-expand-lg bg-dark text-light"
        style={{ marginBottom: "0px", position: "relative", top: "0" }}
      >
        <img src={img1} height="80px" style={{ marginLeft: "50px" }} />
        <h3 style={{ marginLeft: "10px", fontFamily: "sans-serif" }}>
          INVOICE
        </h3>
        <span style={{ marginLeft: "960px" }}></span>
        {/* <a
          href="/settings"
          class="font-weight-bold text-light"
          style={{ marginLeft: "10px" }}
        >
          Settings
        </a> */}
        <a
          href="/"
          className="btn btn-outline-light"
          style={{ marginLeft: "10px" }}
        >
          Logout
        </a>
      </div>
    </div>
  );
}

export default Navfirst;
