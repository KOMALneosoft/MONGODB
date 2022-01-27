const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const jwtSecret = "asd889asdas5656asdas887";
const nodemailer = require("nodemailer");
const PDFDoc = require("pdfkit");
const fs = require("fs");

const id = "kkv987654321@gmail.com";
const ps = "komal@1109";

// const fs=require('fs')
//dbconnection
const db = "mongodb://localhost:27017/myinvoice";
const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);
  }
};
connectDB();
//end
const invoModal = require("../db/InvoSchema");
// const ordersmodel = require("../db/OrdersSchema");
const registermodel = require("../db/RegisterSchema");

function autenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token == null) {
    res.json({ err: 1, msg: "Token not match" });
  } else {
    jwt.verify(token, jwtSecret, (err, data) => {
      if (err) {
        res.json({ err: 1, msg: "Token incorrect" });
      } else {
        console.log("Match");
        next();
      }
    });
  }
}
// router.get("/fetchpost", autenticateToken, (req, res) => {
//   displaymodel.find({}, (err, data) => {
//     if (err) throw err;
//     res.json({ err: 0, data: data });
//   });
// });

router.post("/adduser", (req, res) => {
  // console.log(req.body)
  let ins = new registermodel({
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
    password: req.body.password,
    company_name: req.body.company_name,
    company_address: req.body.company_address,
    company_logo: req.body.company_logo,
  });
  ins.save((err) => {
    if (err) {
      console.log(err);
      res.send("Already Added");
    } else {
      res.send("ok");
    }
  });
});
///////////////////////
router.get("/verify", (req, res) => {
  registermodel.find({}, (err, data) => {
    if (err) throw err;
    res.json({ data: data });
  });
});

router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  registermodel.findOne({ email: email, password: password }, (err, data) => {
    if (err) {
      res.json({ err: 1, msg: "Email or password is not correct" });
    } else if (data == null) {
      res.json({ err: 1, msg: "Email or password is not correct" });
    } else {
      let payload = {
        uid: email,
      };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 });
      res.json({ err: 0, msg: "Login Success", token: token });
    }
  });
});
///////////////////////////////////////////////////////

router.get("/download", function (req, res) {
  const file = `./invoices/invo.pdf`;
  res.download(file);
  // Set disposition and send it.
});

router.get("/sendpdf", (req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: id,
      pass: ps,
    },
  });

  let mailOptions = {
    from: "kkv987654321@gmail.com",
    to: "komal.verma@neosoftmail.com",
    subject: "Order Confirmed!",
    text: "Download below invoice, Thank you for shopping with us!",
    attachments: [
      {
        // use URL as an attachment
        filename: "invo.pdf",
        path: "./invoices/invo.pdf",
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.send("<h1>Sent Successfully!</h1>");
    }
  });
});

///////////////////////
router.post("/invoice", (req, res) => {
  console.log(req.body);
  let inv = req.body;
  createInvoice(inv, "./invoices/invo.pdf");
  let ins = new invoModal(inv);
  ins.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send({
        flg: 1,
        message: "Generated Successfully!",
      });
    }
  });
  //res.send("data arrived");
});

function createInvoice(invoice, path) {
  let doc = new PDFDoc({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc
    .image("./logo.png", 50, 45, { width: 80, height: 80 })
    .fillColor("#444444")
    .fontSize(20)
    .text("INVOICE", 110, 57)
    .fontSize(10)
    .text("Infy Inc", 200, 50, { align: "right" })
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateCustomerInformation(doc, invoice) {
  const shipping = invoice.shipping;

  doc
    .fillColor("#444444")
    .font("Helvetica")
    .fontSize(20)
    .text("Invoice", 50, 160);
  generateHr(doc, 185);
  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .text(`Invoice Number: ${invoice.invono}`, 50, 200)
    .font("Helvetica")
    .text(`Invoice Date: ${invoice.idate}`, 50, 215)
    .text(`Due Date: ${invoice.ddate}`, 50, 230)
    .font("Helvetica-Bold")
    .text(shipping.rname, 300, 200)
    .font("Helvetica")
    .text(shipping.radd, 300, 215)
    .text(
      `${shipping.city}, ${shipping.state}, ${shipping.country}, ${shipping.pin}`,
      300,
      230
    )
    .moveDown();
  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Items",
    "Quantity",
    "Unit Cost",
    "Discount",
    "Line Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");
  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.sofaname,
      item.price,
      item.card,
      item.email
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Sub Total",
    "",
    invoice.ftotal
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "Paid Status",
    "",
    invoice.paid
  );
  doc.font("Helvetica");
}
function generateTableRow(doc, y, c1, c2, c3, c4, c5) {
  doc
    .fontSize(10)
    .text(c1, 50, y)
    .text(c2, 130, y, { width: 90, align: "right" })
    .text(c3, 250, y, { width: 90, align: "right" })
    .text(c4, 350, y, { width: 90, align: "right" })
    .text(c5, 450, y, { width: 90, align: "right" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

//////////////////////////

module.exports = router;
