const express = require("express");

const app = express();
const mongoose = require("mongoose");

const path = require("path");
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
mongoose.connect("mongodb://127.0.0.1:27017/students");
mongoose.connection.once("open", () => {
    console.log("mongodb connection succesfuly..");
});
const Userschema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
});
const Users = mongoose.model("data", Userschema);

app.get("/", (req, res) => {
    // res.send("hello
    // server");
    res.sendFile(path.join(__dirname, ""));
});

app.post("/post", async (req, res) => {
    const { name, email, subject, message } = req.body;
    const user = new Users({
        name,
        email,
        subject,
        message,
    });
    await user.save();
});

app.listen(port, () => {
    console.log(`server is started on ${port}`);
});