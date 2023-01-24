const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mongodb = require("mongodb");
var nodemailer = require("nodemailer");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
const { validateUser } = require("./RegisterSalesperson");
const { validateAdmin } = require("./adminDetail");
const { validateTask } = require("./Task/CreateTask");

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
    console.log("connected to Database");
  })
  .catch((e) => console.log(e));

require("./RegisterSalesperson");
require("./Task/TaskPriority");
require("./Task/TaskType");
require("./Task/CreateTask");

const User = mongoose.model("Userinfo");
const priority = mongoose.model("TaskPriority");
const taskType = mongoose.model("TaskType");
const createTask = mongoose.model("CreateTask");

app.post("/register", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

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

app.get("/getsalesperson", async (req, res) => {
  try {
    const data = await User.find();
    console.log(data);
    res.send(data);
  } catch (error) {
    res.send({ status: "Error" });
  }
});

app.delete("/:id", async (req, res) => {
  console.log(req.params.id);
  let result = await User.deleteOne({
    _id: new mongodb.ObjectId(req.params.id),
  });

  res.send(result);
});

app.get("/getsalesperson/:id", async (req, res) => {
  try {
    let result = await User.findOne({ _id: req.params.id });

    console.log(result);
    if (result) {
      res.send(result);
    } else {
      res.send({ result: "No Record Found" });
    }
  } catch (error) {
    res.send({ status: "Error" });
  }
});

app.put("/updateSalesperson/:id", async (req, res) => {
  console.log(req.body);
  let result = await User.updateOne({ _id: req.params.id }, { $set: req.body });
  res.send(result);
});

require("./adminDetail");

const Admin = mongoose.model("Admininfo");

app.post("/login-user", async (req, res) => {
  const { error } = validateAdmin(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { email, password } = req.body;

  const user = await Admin.findOne({ email });

  if (!user) {
    return res.json({ error: "User Not Found" });
  }
  const ismatch = await bcrypt.compare(password, user.password);

  if (ismatch) {
    const token = jwt.sign({}, JWT_SECRET);
    if (res.status(201)) {
      return res.json({ status: "ok", data: token, user: user });
    } else {
      return res.json({ status: "error  " });
    }
  }
  res.json({ status: "error", error: "Invalid password " });
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
        pass: "upcaqvopjftslhfj",
      },
    });

    var mailOptions = {
      from: "workforce@gmail.com",
      to: "zalankhan180@gmail.com",
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

app.get("/gettaskpriority", async (req, res) => {
  try {
    const data = await priority.find();
    console.log(data);
    res.send(data);
  } catch (error) {
    res.send({ status: "Error" });
  }
});

app.get("/gettasktype", async (req, res) => {
  try {
    const data = await taskType.find();
    console.log(data);
    res.send(data);
  } catch (error) {
    res.send({ status: "Error" });
  }
});

app.post("/createTask", async (req, res) => {
  const { error } = validateTask(req.body);
  console.log("error backend", error);
  if (error) return res.status(400).send(error.details[0].message);

  const {
    taskName,
    taskDescription,
    startDate,
    endDate,
    taskPriority,
    taskType,
    targetLocation,
    salespersonId,
  } = req.body;

  try {
    await createTask.create({
      taskName,
      taskDescription,
      startDate,
      endDate,
      taskPriority,
      taskType,
      targetLocation,
      salespersonId,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "Error" });
  }
});

app.get("/getTasks", async (req, res) => {
  try {
    const data = await createTask.find();
    console.log(data);
    res.send(data);
  } catch (error) {
    res.send({ status: "Error" });
  }
});

app.get("/getTasks/:id", async (req, res) => {
  try {
    let result = await createTask.findOne({ _id: req.params.id });

    console.log(result);
    if (result) {
      res.send(result);
    } else {
      res.send({ result: "No Record Found" });
    }
  } catch (error) {
    res.send({ status: "Error" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  console.log(req.params.id);
  let result = await createTask.deleteOne({
    _id: new mongodb.ObjectId(req.params.id),
  });

  res.send(result);
});

app.put("/updateTasks/:id", async (req, res) => {
  console.log(req.body, "from update");
  let result = await createTask.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});














app.post('/users',(req,res)=>{
 
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "ihtishamshami180@gmail.com",
        pass: "upcaqvopjftslhfj",
      }
  });

  var mailOptions = {
      from: 'ihtishamshami180@gmail.com',// sender address
      to: req.body.to, // list of receivers
      subject: req.body.subject, // Subject line
      text:req.body.description,
      html: `
      <div style="padding:10px;border-style: ridge">
      <p>You have a new contact request.</p>
      <h3>Contact Details</h3>
      <ul>
          <li>Email: ${req.body.to}</li>
          <li>Subject: ${req.body.subject}</li>
          <li>Message: ${req.body.description}</li>
      </ul>
      `
  };
   
  transporter.sendMail(mailOptions, function(error, info){
      if (error)
      {
        res.json({status: true, respMesg: 'Email Sent Successfully'})
      } 
      else
      {
        res.json({status: true, respMesg: 'Email Sent Successfully'})
      }
   
    });
});







app.listen(5000, () => {
  console.log("server started");
});
