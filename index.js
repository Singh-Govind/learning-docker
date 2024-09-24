const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {hostname} = require("node:os");
require("dotenv").config();
const {connectRabbitMQ, sendToQueue} = require("./rabbit-mq");

connectRabbitMQ(); // connecting to rabbitmq

// this was just for testing nginx load balancer and docker thingy

const User = makeSchema();

function makeSchema() {
    const userSchema = new mongoose.Schema({
        user: {type: String},
        email: {type: String}
    });

    const User = mongoose.model('user', userSchema, 'user');

    return User;
}

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({msg: `welcome to the jungle, id: ${hostname()}`});
});

app.get("/:usern", async (req, res) => {
    const usern = req.params.usern;
    try {
        const userC = await User.findOne({user: usern});

        res.json({msg: "user is", userC});
    } catch (e) {
        res.status(500).json({msg: "something went wrong", err: e.message});
    }
});

app.post("/make-user", async (req, res) => {
    const {user, email} = req.body;
    try {
        await sendToQueue("gov", JSON.stringify({ user })); //sending data to "gov" queue
        const userC = await User.create({user, email});

        res.json({msg: 'user created', userC});

    } catch (e) {
        res.status(500).json({msg: "something went wrong", err: e.message});
    }
});

app.get("/a/hey-there", (req, res) => {
    res.json({msg: "should receive hey there"});
})

app.listen(process.env.PORT || 3000, process.env.HOST || '0.0.0.0', async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("server started at port 3000");
    } catch (e) {
        console.log("error", e.message);
    }
});
