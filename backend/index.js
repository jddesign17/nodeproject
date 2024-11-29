const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();


app.use(express.json());
app.use(cors());

const userSchema = new mongoose.Schema({
  username: String,
  age: Number,
  phone_number: Number,
});

const userModel = mongoose.model("user", userSchema);

app.post("/register", async (req, res) => {
  try {
    const { name, age, phone_number } = req.body;
    const user = await userModel.create({
      username: name,
      age: age,
      phone_number: phone_number,
    });
    await user.save();
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});



app.get("/getuser", async (req, res) => {
  try {
    const response = await userModel.find();
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, phone_number } = req.body;

    const user = await userModel.findById(id);

    if (!user) {
      res.send("user not found");
    }

    const userData = await userModel.findByIdAndUpdate(
      id,
      { username: name, age: age, phone_number: phone_number },
      { new: true }
    );
    res.send(userData);
  } catch (error) {
    res.send(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

app.get("/getuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});
mongoose
  .connect(
    "mongodb+srv://surendar:1234@cluster0.rdcv1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("DB is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("server is Running");
});
