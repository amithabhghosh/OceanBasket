const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDb = require("./Config/db");
const CustomerRoute = require("./Routes/CustomerRoute")
connectDb();

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());

// app.use(cors({
//     origin: [process.env.FRONTENDLINK], 
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
// }));

app.use("/api/customer",CustomerRoute)

const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log("Server Running Successfully")
})