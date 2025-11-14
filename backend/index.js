const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
connectDB();
const urlRoutes = require("./routes/url");
const {redirectUrl} = require("./controllers/urlController")
const port = process.env.PORT;
app.use(express.json());
app.use(cors());

app.use("/api/url",urlRoutes);
app.get("/:shortId", redirectUrl);

app.listen(port,
    console.log("server started")
);

app.get("/", function(req,res){
    res.send(`server chalu hai at ${port}`)
})
