const express = require("express");
const app = express();
const cors = require("cors");
const { connectDatabase } = require("./utility/dbConnection");

require("dotenv").config();

app.use(cors());
app.use(express.json());

connectDatabase();
// routes
const user = require("./routes/user");

app.use("/api/user", user);

const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`Application running on ${port}`)
})