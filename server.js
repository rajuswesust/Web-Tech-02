const express = require("express");
require("dotenv").config();
const expressValidator = require('express-validator')
const memoryCache = require("./cache/cache")
const VerifyToken = require("./auth/tokenValidation")
const DeleteBlog = require("./crud_blog/delete");
const UpdateBlog = require("./crud_blog/update") 
const ReadBlog = require("./crud_blog/read")
const CreateBlog = require("./crud_blog/create")
const loginRoutes = require("./user/register")
const bodyparser = require("body-parser");
const dbConnection = require("./db/database");
const UpdateProfile = require("./user/userUpdate")
const { register } = require("./user/register");
const login = require("./user/login");
const app = express();
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());
app.use(express.json())



app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.get("/",(req,res)=>{
    res.send("Welcome to home Page")
});
app.get("/read",memoryCache.cache(100),ReadBlog.readBlog);
app.post("/create",VerifyToken.verifyToken,CreateBlog.createBlog)
app.patch("/update/:id",VerifyToken.verifyToken,UpdateBlog.updateBlog);
app.delete("/delete/:id",VerifyToken.verifyToken,DeleteBlog.deleteBlog);

app.post("/register",loginRoutes.register)
app.post("/login",login.login)
app.patch("/updateUser/:id",VerifyToken.verifyToken,UpdateProfile.updateProfileInfo);


app.listen(3000);