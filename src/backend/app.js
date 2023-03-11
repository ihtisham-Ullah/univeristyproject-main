const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mongodb = require("mongodb");
var nodemailer = require("nodemailer");
const multer = require("multer");
const DatauriParser = require("datauri/parser");
const path = require("path");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
// const { validateUser } = require("./RegisterSalesperson");

const { validateAdmin } = require("./adminDetail");
const { validateTask } = require("./Task/CreateTask");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
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
require("./Task/TaskDetail");
require("./attendance/viewAttendance");

const User = mongoose.model("Userinfo");
const priority = mongoose.model("TaskPriority");
const taskType = mongoose.model("TaskType");
const createTask = mongoose.model("CreateTask");
const getTasksFeedback = mongoose.model("TaskDetail");
const attendance = mongoose.model("clockins");
cloudinary.config({
  cloud_name: "dm8mvmjp2",
  api_key: "485161167585779",
  api_secret: "kW-JBevf_NN5N-x8KbywrowLdHI",
  secure: true,
});

// multer configuration
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 3000000,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new Error("Please upload image file."), false);
    }
  },
});

const getDataUri = (file) => {
  const parser = new DatauriParser();
  const extName = path.extname(file.originalname).toString();

  return parser.format(extName, file.buffer);
};

app.post("/register", upload.single("photo"), async (req, res, next) => {
  //   const { error } = validateUser(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  console.log(req.body);

  const photo = getDataUri(req.file);
  try {
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    const isDuplicate = await User.findOne({ email: req.body.email });

    if (isDuplicate)
      return res.status(400).json({ error: "duplicate email entered" });
    const options = {
      folder: "/photo",
      width: 1000,
      height: 1000,
      crop: "scale",
    };

    cloudinary.uploader.upload(photo.content, options, (err, result) => {
      let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: encryptedPassword,
        address: req.body.address,
        phoneNo: req.body.phoneNo,
        photo: result.url,
        cloudinaryId: result.public_id,
      });
      user
        .save()
        .then((result) => {
          res.status(200).json({
            User: user,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err.message,
          });
        });
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
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

app.get("/getTasksFeedback", async (req, res) => {
  try {
    const data = await getTasksFeedback.find();
    console.log(data);
    res.send(data);
  } catch (error) {
    res.send({ status: "Error" });
  }
});
app.delete("/getTasksFeedback/:id", async (req, res) => {
  console.log(req.params.id);
  let result = await getTasksFeedback.deleteOne({
    _id: new mongodb.ObjectId(req.params.id),
  });

  res.send(result);
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

app.delete("/getTasks/:id", async (req, res) => {
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

app.post("/users", (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ihtishamshami180@gmail.com",
      pass: "upcaqvopjftslhfj",
    },
  });

  var mailOptions = {
    from: "ihtishamshami180@gmail.com", // sender address
    to: req.body.to, // list of receivers////this will be our selected emailss heree
    subject: req.body.subject, // Subject /// here type will
    text: req.body.description, ///here deciptionn
    html: `
      <div style="padding:10px;border-style: ridge">
      <p>You have a new contact request.</p>
      <h3>Contact Details</h3>
      <ul>
          <li>Email: ${req.body.to}</li>
          <li>Subject: ${req.body.subject}</li>
          <li>Discription: ${req.body.description}</li>
      </ul>
      `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.json({ status: true, respMesg: "Email Sent Successfully" });
    } else {
      res.json({ status: true, respMesg: "Email Sent Successfully" });
    }
  });
});

// app.get("/viewattendance", async (req, res) => {
//   try {
//     const data = await attendance.find();
//     // console.log(data);
//     const ObjectId = require('mongodb').ObjectId;

//     const cursor = attendance.find({}, { userId: 1 });

//     const attendanceList = [];
//     for await (const doc of cursor) {
//       attendanceList.push(doc);
//     }
//     const userIds = attendanceList.map((doc) => ObjectId(doc.userId));
//     const userPromises = userIds.map((id) => User.findOne({ _id: id }).select('-password'));
//     const salespersonData = await Promise.all(userPromises);

//     res.send(data);
//   } catch (error) {
//     console.log(error);
//     res.send({ status: "Error" });
//   }
// });

app.get("/viewattendance", async (req, res) => {
  try {
    const data = await attendance.find().lean();
    const ObjectId = require("mongodb").ObjectId;

    const cursor = attendance.find({}, { userId: 1 }).lean();
    const attendanceList = [];
    for await (const doc of cursor) {
      attendanceList.push(doc);
    }

    const userIds = attendanceList.map((doc) => ObjectId(doc.userId));
    const userPromises = userIds.map((id) =>
      User.findOne({ _id: id }).select("-password -address").lean()
    );
    const salespersonData = await Promise.all(userPromises);

    const mergedData = data.map((attendanceDoc) => {
      const salespersonDoc = salespersonData.find((userDoc) =>
        userDoc._id.equals(attendanceDoc.userId)
      );
      if (salespersonDoc) {
        return { ...attendanceDoc, ...salespersonDoc };
      } else {
        return attendanceDoc;
      }
    });

    res.send(mergedData);
  } catch (error) {
    console.log(error);
    res.send({ status: "Error" });
  }
});

app.listen(5000, () => {
  console.log("server started");
});
