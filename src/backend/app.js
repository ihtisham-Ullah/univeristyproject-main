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
const fs = require("fs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Update this with your client URL
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

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
require("./Media/Media");
require("./Complain/Complain");

const User = mongoose.model("Userinfo");
const priority = mongoose.model("TaskPriority");
const taskType = mongoose.model("TaskType");
const createTask = mongoose.model("CreateTask");
const getTasksFeedback = mongoose.model("TaskDetail");
const attendance = mongoose.model("clockins");
const Media = mongoose.model("Media");
const Complain = mongoose.model("complaint");

cloudinary.config({
  cloud_name: "dm8mvmjp2",
  api_key: "485161167585779",
  api_secret: "kW-JBevf_NN5N-x8KbywrowLdHI",
  secure: true,
});


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
      return res.status(400).json({ error: "This email is already taken" });
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

app.put("/updateSalesperson/:id", upload.single("photo"), async (req, res) => {
  try {
    let photoUrl = null;
    if (req.file) {
      const photo = getDataUri(req.file);
      const options = {
        folder: "/photo",
        width: 1000,
        height: 1000,
        crop: "scale",
      };
      // upload photo to Cloudinary and get URL
      const result = await cloudinary.uploader.upload(photo.content, options);
      photoUrl = result.url;
    }

    // update user document in database
    const update = {};
    if (req.body.firstName) {
      update.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      update.lastName = req.body.lastName;
    }
    if (req.body.email) {
      update.email = req.body.email;
    }
    if (req.body.address) {
      update.address = req.body.address;
    }
    if (req.body.phoneNo) {
      update.phoneNo = req.body.phoneNo;
    }
    if (photoUrl) {
      update.photo = photoUrl;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Email is already taken" });
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

app.delete("/delete/:id", async (req, res) => {
  console.log(req.params.id);
  const id = new mongodb.ObjectId(req.params.id);

  let result = await User.deleteOne({ _id: id });

  await Media.deleteMany({ salespersonId: id });

  await attendance.deleteMany({ userId: id });

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

require("./adminDetail");

const Admin = mongoose.model("Admininfo");

app.post("/login-user", async (req, res) => {
  // const { error } = validateAdmin(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
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
    firstName,
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
      firstName,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "Error" });
  }
});

app.get("/getTasks", async (req, res) => {
  try {
    const data = await createTask.find();
    const updatedData = [];

    for (let i = 0; i < data.length; i++) {
      const taskId = data[i]._id;
      const salespersonId = data[i].salespersonId;
      const user = await User.findOne({ _id: salespersonId }).select("-password -email -lastName -address -phoneNo");

      if (user) {
        const mergedData = { ...data[i]._doc, ...user._doc };
        updatedData.push({ ...mergedData, taskId });
      } else {
        updatedData.push({ ...data[i]._doc, taskId });
      }
    }

    console.log(updatedData);
    res.send(updatedData);
  } catch (error) {
    res.send({ status: "Error" });
  }
});







app.get("/getTasksFeedback", async (req, res) => {
  try {
    const taskFeedback = await getTasksFeedback.find().lean();
    console.log(taskFeedback);
    const salespersonIds = taskFeedback.map((m) => m.userId);
    const users = await User.find({ _id: { $in: salespersonIds } }).lean();
    const feedbackWithUsers = taskFeedback.map((m) => {
      const user = users.find((u) => u._id.toString() === m.userId.toString());
      const { userId, ...rest } = m;
      const feedbackId = m._id;

      return { feedbackId, ...rest, ...user };
    });
    res.json(feedbackWithUsers);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
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

app.get("/viewattendance", async (req, res) => {
  try {
    const data = await attendance.find().lean();
    const ObjectId = require("mongodb").ObjectId;

    const cursor = attendance.find({}, { userId: 1 }).lean();
    const attendanceList = [];
    for await (const doc of cursor) {
      attendanceList.push(doc);
    }

    const userIds = attendanceList
      .filter((doc) => doc.userId !== null && doc.userId !== undefined)
      .map((doc) => ObjectId(doc.userId));
    const userPromises = userIds.map((id) =>
      User.findOne({ _id: id }).select("-password -address").lean()
    );
    const salespersonData = await Promise.all(userPromises);

    const mergedData = data.map((attendanceDoc) => {
      const salespersonDoc = salespersonData.find((userDoc) =>
        userDoc._id.equals(attendanceDoc.userId)
      );
      if (salespersonDoc) {
        return {
          ...attendanceDoc,
          ...salespersonDoc,
          attId: attendanceDoc._id,
        };
      } else {
        return attendanceDoc;
      }
    });

    res.send(mergedData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

app.get("/attendance", async (req, res) => {
  try {
    const data = await attendance.find();
    console.log(data);
    res.send(data);
  } catch (error) {
    res.send({ status: "Error" });
  }
});

app.delete("/viewattendance/:id", async (req, res) => {
  console.log(req.params.id);
  let result = await attendance.deleteOne({
    _id: new mongodb.ObjectId(req.params.id),
  });

  res.send(result);
});

const storage = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (
      ext !== ".mp4" &&
      ext !== ".mkv" &&
      ext !== ".jpeg" &&
      ext !== ".jpg" &&
      ext !== ".png"
    ) {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

app.post("/uploadVideo", storage.single("file"), (req, res) => {
  console.log(req.body);
  const { salespersonId, title } = req.body;

  cloudinary.uploader.upload(
    req.file.path,
    {
      resource_type: "video",
      folder: "video",
    },
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      const media = new Media({
        name: req.file.originalname,
        url: result.url,
        cloudinary_id: result.public_id,
        salespersonId: salespersonId,
        title: title,
      });

      media.save((err, savedMedia) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        return res.status(200).send(savedMedia);
      });
    }
  );
});

app.get("/getmedia", async (req, res) => {
  try {
    const media = await Media.find().lean();
    const salespersonIds = media.map((m) => m.salespersonId);
    const users = await User.find({ _id: { $in: salespersonIds } }).lean();
    const mediaWithUsers = media.map((m) => {
      const user = users.find(
        (u) => u._id.toString() === m.salespersonId.toString()
      );
      const { salespersonId, ...rest } = m;
      const mediaId = m._id;
      delete user.email;
      delete user.password;
      delete user.updatedAt;
      delete user.createdAt;
      delete user.phoneNo;
      delete user.address;
      delete user.lastName;
      return { mediaId, ...rest, ...user };
    });
    res.json(mediaWithUsers);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

app.delete("/getmedia/:id", async (req, res) => {
  console.log(req.params.id);
  let result = await Media.deleteOne({
    _id: new mongodb.ObjectId(req.params.id),
  });

  res.send(result);
});

app.put("/updatemedia/:id", storage.single("file"), async (req, res) => {
  try {
    const { salespersonId, title } = req.body;
    const mediaId = req.params.id;

    const media = await Media.findById(mediaId);
    if (!media) {
      return res.status(404).send("Media not found");
    }

    if (req.file) {
      cloudinary.uploader.destroy(media.cloudinary_id);

      cloudinary.uploader.upload(
        req.file.path,
        {
          resource_type: "video",
          folder: "video",
        },
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }

          media.name = req.file.originalname;
          media.url = result.url;
          media.cloudinary_id = result.public_id;
          media.salespersonId = salespersonId;
          media.title = title;

          media.save((err, savedMedia) => {
            if (err) {
              console.log(err);
              return res.status(500).send(err);
            }
            return res.status(200).send(savedMedia);
          });
        }
      );
    } else {
      media.salespersonId = salespersonId;
      media.title = title;

      media.save((err, savedMedia) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        return res.status(200).send(savedMedia);
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

app.get("/getComplain", async (req, res) => {
  try {
    const data = await Complain.find();
    const updatedData = [];

    for (let i = 0; i < data.length; i++) {
      const complainId = data[i]._id;
      const userId = data[i].userId;
      const user = await User.findOne({ _id: userId }).select("-password -email -lastName -address -phoneNo");

      if (user) {
        const mergedData = { ...data[i]._doc, ...user._doc };
        updatedData.push({ ...mergedData, complainId });
      } else {
        updatedData.push({ ...data[i]._doc, complainId });
      }
    }

    console.log(updatedData);
    res.send(updatedData);
  } catch (error) {
    res.send({ status: "Error" });
  }
});

app.delete("/getComplain/:id", async (req, res) => {
  console.log(req.params.id);
  let result = await Complain.deleteOne({
    _id: new mongodb.ObjectId(req.params.id),
  });

  res.send(result);
});

app.listen(5000, () => {
  console.log("server started");
});
