require('dotenv').config();

const express = require('express');
const { default: mongoose } = require('mongoose');
const router = require('./routes/route')

const DB_URL = process.env.DATABASE_URL;
mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on("error", (err) => {
    console.error(err);
})

db.once("connected", () => {
    console.log("DB CONNECTED");
})


const app = express();

app.use(express.json());
app.use("/", router);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
})