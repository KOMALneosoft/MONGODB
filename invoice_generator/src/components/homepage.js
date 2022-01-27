import React from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Navfirst from "./navfirst";

function Home1() {
  console.log("homepage");
  return (
    <div id="homie">
      <Navfirst />
      <h1
        class=" font-weight-bold"
        style={{ fontFamily: "'Alfa Slab One', cursive" }}
      >
        INVOICE
      </h1>
      <a
        href="/login"
        class="btn btn-warning font-weight-bold"
        style={{
          width: "25%",
          marginLeft: "50px",
          marginTop: "20px",
          marginBottom: "10px",
        }}
      >
        Get Started
      </a>
    </div>
  );
}

export default Home1;
