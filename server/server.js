const express= require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const routesUrls = require("./Routes/routes");

dotenv.config();
//connect to mongoose
mongoose.connect(process.env.DATABASE_ACCESS, () => {
    console.log('Connected to Mongoose database');
});

//middlewares
app.use(express.json());
app.use(cors());
app.use('/app', routesUrls);
//app listens to a certain Port
app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
})