import React, { Component } from "react";
import Navfirst from "./navfirst";
import { Link, Navigate } from "react-router-dom";
import { Redirect } from "react-router";
import { addUser } from "../config/MyService";
import axios from "axios";

const regForName = RegExp(/^[A-Za-z]/);
const regForEve = RegExp(/^(?!^ +$)^.+$/);
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForMobile = RegExp(/^[0-9]{10}$/);

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prodata: [],
      fname: "",
      mobile: "",
      email: "",
      password: "",
      confirm_password: "",
      // company_name: "",
      // company_address: "",
      // company_logo: "",
      errors: {
        fname: "",
        mobile: "",
        email: "",
        password: "",
        confirm_password: "",
        // company_name: "",
        // company_address: "",
        // company_logo: "",
      },
      err: {
        fname: "",
        mobile: "",
        email: "",
        password: "",
        confirm_password: "",
        // company_name: "",
        // company_address: "",
        // company_logo: "",
      },
      flag: 0,
    };
  }

  /////////////////////////////////////
  handle = (event) => {
    const { name, value } = event.target;

    let errors = this.state.errors;
    let err = this.state.err;
    switch (name) {
      case "fname":
        errors.fname = regForName.test(value) ? "" : "Enter Valid first Name";
        if (errors.fname !== "") {
          err.fname = "error";
        } else {
          err.fname = "";
        }
        break;

      case "mobile":
        errors.mobile = regForMobile.test(value) ? "" : "Enter 10 digits only!";
        if (errors.mobile !== "") {
          err.mobile = "error";
        } else {
          err.mobile = "";
        }
        break;
      case "email":
        errors.email = regForEmail.test(value) ? "" : "Enter Valid Email";
        if (errors.email !== "") {
          err.email = "error";
        } else {
          err.email = "";
        }
        break;
      case "password":
        errors.password = regForEve.test(value) ? "" : "Enter Password";
        if (errors.password !== "") {
          err.password = "error";
        } else {
          err.password = "";
        }
        break;
      case "confirm_password":
        errors.confirm_password =
          this.state.password === value
            ? ""
            : "Password and Confirm Password does not match";
        if (errors.confirm_password !== "") {
          err.confirm_password = "error";
        } else {
          err.fname = "";
        }
        break;
      // case "company_name":
      //   errors.company_name = regForName.test(value)
      //     ? ""
      //     : "Enter Valid first Name";
      //   if (errors.company_name !== "") {
      //     err.company_name = "error";
      //   } else {
      //     err.company_name = "";
      //   }
      //   break;
      // case "company_address":
      //   errors.company_address = regForName.test(value)
      //     ? ""
      //     : "Enter Valid first Name";
      //   if (errors.company_address !== "") {
      //     err.company_address = "error";
      //   } else {
      //     err.company_name = "";
      //   }
      //   break;
      // case "company_logo":
      //   errors.company_logo = regForName.test(value)
      //     ? ""
      //     : "Enter Valid first Name";
      //   if (errors.company_logo !== "") {
      //     err.company_logo = "error";
      //   } else {
      //     err.company_logo = "";
      //   }
      //   break;
    }
    this.setState({ err, errors, [name]: value }, () => {
      console.log(this.state);
    });
  };
  ////////////////////////
  formSubmit = (event) => {
    event.preventDefault();

    if (this.validate(this.state.errors)) {
      if (
        this.state.email !== "" &&
        this.state.password !== "" &&
        this.state.fname !== "" &&
        this.state.mobile !== ""
      ) {
        if (this.add()) {
          alert("Details added successfully !!");
        } else {
          alert("something went wrong");
        }
      } else {
        alert("Failed to Register");
      }
    } else {
      alert("Please Enter Valid Details");
    }
  };
  validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };
  ////////////////////////////////////////////////////////////////////////
  add = async (event) => {
    // const URL = "http://localhost:9000/api/adduser";
    // axios
    //   .post(URL, {
    await addUser({
      name: this.state.fname,
      mobile: this.state.mobile,
      email: this.state.email,
      password: this.state.password,
      // company_name: this.state.company_name,
      // company_address: this.state.company_address,
      // company_logo: this.state.company_logo,
    }).catch((err) => {
      console.log(err);
    });
    this.state.flag = 1;
    this.setState({ ...this.state });
  };
  ////////////////////////////////////////////////////////////////////////////////////
  render() {
    const { errors } = this.state;
    return (
      <div>
        {this.state.flag == 1 && <Navigate to="/login" />}
        <Navfirst />
        <div
          class="container-fluid bg-dark text-light font-weight-bold p-1 "
          style={{ marginTop: "20", width: "700px" }}
        >
          <h1
            className="text-success "
            style={{
              fontSize: "10mm",
              textAlign: "center",
            }}
          >
            Registration
          </h1>
          <div className=" form-group text-light ">
            <div className="col-md-8 mx-auto">
              <form onSubmit={this.formSubmit} method="post">
                <table>
                  <tr>
                    <td>
                      <label
                        style={{ fontFamily: "initial", fontSize: "16px" }}
                      >
                        Enter Name:
                      </label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="fname"
                        className="form-control"
                        onChange={this.handle}
                      />
                      {errors.fname.length > 0 && (
                        <span style={{ color: "red" }}>{errors.fname}</span>
                      )}
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>
                      <label
                        style={{ fontFamily: "initial", fontSize: "16px" }}
                      >
                        Enter Contact No:
                      </label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="mobile"
                        className="form-control"
                        onChange={this.handle}
                      />
                      {errors.mobile.length > 0 && (
                        <span style={{ color: "red" }}>{errors.mobile}</span>
                      )}
                    </td>
                  </tr>{" "}
                  <br />
                  <tr>
                    <td>
                      <label
                        style={{ fontFamily: "initial", fontSize: "16px" }}
                      >
                        Enter Email ID:
                      </label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        onChange={this.handle}
                      />
                      {errors.email.length > 0 && (
                        <span style={{ color: "red" }}>{errors.email}</span>
                      )}
                    </td>
                  </tr>{" "}
                  <br />
                  <tr>
                    <td>
                      <label
                        style={{ fontFamily: "initial", fontSize: "16px" }}
                      >
                        Enter Password:
                      </label>
                    </td>
                    <td>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        onChange={this.handle}
                      />
                      {errors.password.length > 0 && (
                        <span style={{ color: "red" }}>{errors.password}</span>
                      )}
                    </td>
                  </tr>{" "}
                  <br />
                  <tr>
                    <td>
                      <label
                        style={{ fontFamily: "initial", fontSize: "16px" }}
                      >
                        Confirm Password:
                      </label>
                    </td>
                    <td>
                      <input
                        type="password"
                        name="confirm_password"
                        className="form-control"
                        onChange={this.handle}
                      />
                      {errors.confirm_password.length > 0 && (
                        <span style={{ color: "red" }}>
                          {errors.confirm_password}
                        </span>
                      )}
                    </td>
                  </tr>
                  <br />
                  {/* <tr>
                    <td>
                      <label
                        style={{ fontFamily: "initial", fontSize: "16px" }}
                      >
                        Company name:
                      </label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="company_name"
                        className="form-control"
                        onChange={this.handle}
                      />
                      {errors.company_name.length > 0 && (
                        <span style={{ color: "red" }}>
                          {errors.company_name}
                        </span>
                      )}
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>
                      <label
                        style={{ fontFamily: "initial", fontSize: "16px" }}
                      >
                        Company address:
                      </label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="company_address"
                        className="form-control"
                        onChange={this.handle}
                      />
                      {errors.company_address.length > 0 && (
                        <span style={{ color: "red" }}>
                          {errors.company_address}
                        </span>
                      )}
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>
                      <label
                        style={{ fontFamily: "initial", fontSize: "16px" }}
                      >
                        Company Logo:
                      </label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="company_logo"
                        className="form-control"
                        onChange={this.handle}
                      />
                      {errors.company_logo.length > 0 && (
                        <span style={{ color: "red" }}>
                          {errors.company_logo}
                        </span>
                      )}
                    </td>
                  </tr>
                  */}
                  <tr>
                    <td colspan="2" align="center">
                      <input
                        type="submit"
                        value="Submit"
                        className="btn btn-success "
                        style={{ marginLeft: "250px", marginTop: "5px" }}
                      />
                    </td>
                  </tr>
                  <p className="text-center">
                    If Registered, Go to <Link to="/login">Login Page</Link>
                  </p>
                </table>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
