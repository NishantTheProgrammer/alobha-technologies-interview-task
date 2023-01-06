const express = require("express");
const app = express();
const { address } = require("ip");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/user.route");

require("dotenv").config({ path: "./.env" });



const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('mongoose connected');
})

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use('/api/user', userRoute);

const ip = address();
app.listen(port, ip, () => {
  console.log(`Server is running on port: http://${ip}:${port}`);
});