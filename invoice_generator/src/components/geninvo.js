import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import Navsecond from "./navsecond";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GenInvo() {
  const [rdata, setRdata] = useState([]);
  const [idata, setIdata] = useState([]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const prevData = (data) => {
    if (data) {
      let info = {
        invono: parseInt(data.invono),
        rname: data.rname,
        radd: data.radd,
        city: data.city,
        state: data.state,
        country: data.country,
        pin: data.pin,
        idate: data.idate,
        ddate: data.ddate,
      };
      setRdata([info]);
    } else {
      alert("Data is not comming!!");
    }
  };

  console.log(rdata);

  const prevItem = (data) => {
    if (data) {
      let info = {
        iname: data.iname,
        quantity: parseInt(data.quantity),
        price: parseInt(data.price),
        discount: parseInt(data.discount),
        total: parseInt(
          (parseInt(data.price) -
            (parseInt(data.price) * parseInt(data.discount)) / 100) *
            parseInt(data.quantity)
        ),
      };
      setIdata([...idata, info]);
    } else {
      alert("Data is not comming!!");
    }
  };

  // const up = () => {};

  // const del = (index) => {
  //   // let d = idata;
  //   // d.splice(index, 1);
  //   idata.splice(index, 1);
  //   //setIdata(d);
  //   //console.log(d);
  // };

  //console.log(idata);

  const genInvoice = () => {
    console.log(rdata[0].rname);
    let deta = {
      invono: rdata[0].invono,
      idate: rdata[0].idate,
      ddate: rdata[0].ddate,
      shipping: {
        rname: rdata[0].rname,
        radd: rdata[0].radd,
        city: rdata[0].city,
        state: rdata[0].state,
        country: rdata[0].country,
        pin: rdata[0].pin,
      },
      items: idata,
      ftotal: 2000,
      paid: "UNPAID",
    };
    //console.log(deta);
    axios.post("http://localhost:9000/api/invoice", deta).then((res) => {
      //console.log(res.data);
      if (res.data.flg === 1) {
        navigate("/pdf");
      }
    });
  };

  return (
    <>
      <Navsecond />

      <Container fluid className="alert-warning">
        <Row>
          <Col>
            <Card
              style={{ padding: "20px", marginTop: "4px" }}
              className="bg-light font-weight-bold"
            >
              <Form onSubmit={handleSubmit(prevData)}>
                <Row className="mb-1">
                  <Col>
                    <Form.Label>Invoice no.</Form.Label>
                    <Form.Control
                      type="number"
                      {...register("invono")}
                      placeholder="Enter invoice number"
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Col>
                  <Col>
                    <Form.Label>Receiver Name</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("rname")}
                      placeholder="Enter receiver name"
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Col>
                </Row>
                <Row className="mb-1">
                  <Col>
                    <Form.Label>Receiver address</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("radd")}
                      placeholder="Enter receiver address"
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Col>
                  <Col>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("city")}
                      placeholder="Enter city"
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Col>
                </Row>
                <Row className="mb-1">
                  <Col>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("state")}
                      placeholder="Enter state"
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Col>
                  <Col>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("country")}
                      placeholder="Enter country"
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Col>
                  <Col>
                    <Form.Label>Pin</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("pin")}
                      placeholder="Enter pin"
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Label>Invoice Date</Form.Label>
                    <Form.Control
                      type="date"
                      {...register("idate")}
                      placeholder="Enter receiver name"
                    />
                  </Col>
                  <Col>
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control
                      type="date"
                      {...register("ddate")}
                      placeholder="Enter receiver name"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      type="submit"
                      class="btn btn-primary"
                      style={{ width: "100%" }}
                    >
                      Add & Preview Data
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
          <Col>
            <Card
              style={{ padding: "20px", marginTop: "4px" }}
              className="alert-success"
            >
              {rdata.map((item, index) => {
                return (
                  <Card>
                    <Card.Body>
                      <Card.Title>Invoice No : {item.invono}</Card.Title>
                      <Card.Text>Name : {item.rname}</Card.Text>
                      <Card.Text>
                        Address : {item.radd}, {item.city}, {item.state},{" "}
                        {item.country}, {item.pin}
                      </Card.Text>
                      <Card.Text>Invoice Date : {item.idate}</Card.Text>
                      <Card.Text>Due Date : {item.ddate}</Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Card
              style={{ padding: "20px", marginTop: "-10px" }}
              className="bg-light"
            >
              <Form onSubmit={handleSubmit(prevItem)}>
                <Row className="mb-1">
                  <Col>
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("iname")}
                      placeholder="Enter item name"
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Col>
                  <Col>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      {...register("quantity")}
                      placeholder="Enter quantity"
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      {...register("price")}
                      placeholder="Enter price/item"
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Col>
                  <Col>
                    <Form.Label>Discount</Form.Label>
                    <Form.Control
                      type="number"
                      {...register("discount")}
                      placeholder="Enter discount in %"
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Col>
                  {/* <Col>
                    <Form.Label>Total</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter total amount"
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Col> */}
                </Row>
                <Row>
                  <Col>
                    <Button
                      type="submit"
                      class="btn btn-primary"
                      style={{ width: "100%" }}
                    >
                      Add & Preview Items
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
          <Col>
            <Card style={{ padding: "20px", marginTop: "-10px" }}>
              <Table striped hover className="text-center">
                <thead>
                  <tr>
                    <th>Sr.No.</th>
                    <th>Items</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Total</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {idata.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.iname}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>{item.discount}</td>
                        <td>{item.total}</td>
                        {/* <td>
                          <Button
                            variant="warning"
                            onClick={() => up(index, item)}
                          >
                            <i class="fa fa-pencil"></i>
                          </Button>
                          &nbsp;
                          <Button variant="danger" onClick={() => del(index)}>
                            <i class="fa fa-trash"></i>
                          </Button>
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Button
              type="submit"
              variant="warning"
              style={{ width: "80%" }}
              className=""
              size="lg"
              block
              onClick={() => genInvoice()}
            >
              Generate Invoice
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default GenInvo;
