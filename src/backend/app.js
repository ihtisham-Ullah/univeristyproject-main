const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
var nodemailer = require("nodemailer");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
const jwt = require("jsonwebtoken");
const JWT_SECRET = "hjgdhsgd786876$#$%$^%&*hvnsma";

const mongoUrl =
  "mongodb+srv://ihtishamullah123:amandara123@cluster0.1nuqc8r.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to server");
  })
  .catch((e) => console.log(e));

require("./userdetails");

const User = mongoose.model("Userinfo");

app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, address, phoneNo } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.send({ error: "User Already Exists" });
    }
    await User.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
      address,
      phoneNo,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "Error" });
  }
});

require("./adminDetail");
const Admin = mongoose.model("Admininfo");

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await Admin.findOne({ email });

  if (!user) {
    return res.json({ error: "User Not Found" });
  }
  const ismatch = await bcrypt.compare(password, user.password);

  if (ismatch) {
    const token = jwt.sign({}, JWT_SECRET);
    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ status: "error  " });
    }
  }
  res.json({ status: "error", error: "Invalid password " });
});

app.listen(5000, () => {
  console.log("server started");
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await Admin.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ihtishamshami180@gmail.com",
        pass: "cjercyhchocelnws",
      },
    });
    //faltoo tabs remove kro okk. mei call lrdo? sure us
    var mailOptions = {
      from: "workforce@gmail.com",
      to: "ihtishamshami180@gmail.com",
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.send({ status: "ok" });
    console.log(link);
  } catch (error) {
    res.send({ status: "Error" });
  }
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await Admin.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await Admin.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await Admin.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    res.render("index", { email: verify.email, status: "verified" });
    res.json({ status: "Password updated" });
  } catch (error) {
    //console.log(error);
    //res.json({ status: "Something Went Wrong" });
  }
});
