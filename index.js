// require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const cors = require("cors");
const KJUR = require("jsrsasign");

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json(), cors());
app.options("*", cors());

app.post("/post", (req, res) => {
  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2;

  console.log(iat, "iat");
  console.log(exp, "exp");

  const oHeader = { alg: "HS256", typ: "JWT" };

  console.log(oHeader, "oHeader");

  const oPayload = {
    appKey: "LFlwAZulThuY3jZujKeO9g",
    sdkKey: "LFlwAZulThuY3jZujKeO9g",
    iat: iat,
    exp: exp,
    role: 0,
    mn: req.body.meetingNumber,
  };
  console.log(oPayload, "oPayload");

  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);

  console.log(sHeader, "sHeader");
  console.log(sPayload, "sPayload");

  const signature = KJUR.jws.JWS.sign(
    "HS256",
    sHeader,
    sPayload,
    "QYKHayNVpmD3aLG9QwtBYZouioJL4awm"
  );

  res.json({
    signature: signature,
  });
});

app.listen(port, () =>
  console.log(
    `Zoom Meeting SDK Auth Endpoint Sample Node.js listening on port ${port}!`
  )
);
