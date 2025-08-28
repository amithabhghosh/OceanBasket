const express = require("express");
require("dotenv").config();
const cors = require("cors");
const http = require('http');
const OrderRoute = require("./Routes/OrderRoutes")
const { initSocket } = require('./Socket');
const bodyParser = require("body-parser");
const connectDb = require("./Config/db");
const CustomerRoute = require("./Routes/CustomerRoute")
const OwnerRoute = require("./Routes/OwnerRoute")
const ProductRoute = require("./Routes/ProductRoute")
const fishImage = require("./Routes/FishImageRoute")
const adminRoute = require("../Backend/Routes/adminRoute")
const cronSchedule = require("./utils/cronSchecdule")
const locationRoute = require("./Routes/LocationRoute")
connectDb();
// cronSchedule()
const app = express();

app.use(cors({ origin: process.env.FRONTENDLINK, credentials: true }));

app.use(express.json());

// app.use(cors({
//     origin: [process.env.FRONTENDLINK], 
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
// }));

app.use("/api/customer",CustomerRoute)
app.use("/api/owner",OwnerRoute)
app.use("/api/product",ProductRoute)
app.use("/api/fishImage",fishImage)
app.use("/api/order",OrderRoute)
app.use("/api/admin",adminRoute)
app.use("/api/location",locationRoute)
const PORT=process.env.PORT || 5000


const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
