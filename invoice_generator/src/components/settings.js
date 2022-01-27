import React, { useState } from "react";
import Navsecond from "./navsecond";

function Settings() {
  const [state, setState] = useState({
    company_name: "",
    company_address: "",
    company_logo: "",
    error: {
      company_name: "",
      company_address: "",
      company_logo: "",
    },
  });

  return (
    <div>
      <Navsecond />
      <form
        class="container  text-light bg-dark"
        style={{ marginTop: "40px", width: "400px", padding: "20px" }}
      >
        <table>
          <tr>
            <td>
              <label style={{ fontFamily: "initial", fontSize: "18px" }}>
                Company name:
              </label>
            </td>
            <td>
              <input
                type="text"
                name="company_name"
                className="form-control"
                //onChange={this.handle}
              />
              {/* {errors.company_name.length > 0 && (
                <span style={{ color: "red" }}>{errors.company_name}</span>
              )} */}
            </td>
          </tr>
          <br />
          <tr>
            <td>
              <label style={{ fontFamily: "initial", fontSize: "18px" }}>
                Company address:
              </label>
            </td>
            <td>
              <input
                type="text"
                name="company_address"
                className="form-control"
                //onChange={this.handle}
              />
              {/* {errors.company_address.length > 0 && (
                <span style={{ color: "red" }}>{errors.company_address}</span>
              )} */}
            </td>
          </tr>
          <br />
          <tr>
            <td>
              <label style={{ fontFamily: "initial", fontSize: "18px" }}>
                Company Logo:
              </label>
            </td>
            <td>
              <input
                type="text"
                name="company_logo"
                className="form-control"
                //onChange={this.handle}
              />
              {/* {errors.company_logo.length > 0 && (
                <span style={{ color: "red" }}>{errors.company_logo}</span>
              )} */}
            </td>
          </tr>

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
        </table>
      </form>
    </div>
  );
}

export default Settings;
