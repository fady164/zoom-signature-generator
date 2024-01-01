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

  const oHeader = { alg: "HS256", typ: "JWT" };

  const oPayload = {
    appKey: "LFlwAZulThuY3jZujKeO9g",
    sdkKey: "LFlwAZulThuY3jZujKeO9g",
    iat: iat,
    exp: exp,
    role: 0,
    mn: req.body.meetingNumber,
  };

  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);

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
