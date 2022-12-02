const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
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

require("./adminDetail");
const User = mongoose.model("Admininfo");

app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not Found" });
  }
  if (password !== user.password) {
    const token = jwt.sign({}, JWT_SECRET);
    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ status: "Error occured" });
    }
  }
  res.json({ status: "error", error: "Invalid password " });
});

app.listen(7000, () => {
  console.log("server started");
});
