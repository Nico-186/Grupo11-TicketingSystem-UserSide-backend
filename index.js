const express = require("express");
const app = express();
const cors = require("cors");

const user = require("./routes/User");
const login = require("./routes/login");

const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/admin/allUsers/", user)
app.use("/logindata/", login);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

app.get('/',(req,res)=>res.json({message:'This work'}));
app.listen(process.env.PORT || port);