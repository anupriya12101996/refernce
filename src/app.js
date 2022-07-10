const express=require('express');
const path=require("path");
const hbs=require("hbs");
const app=express();
require("./db/conn");
const Register=require("./models/register");
const {json} = require("express");
const port=process.env.PORT || 3000;


const static_path=(path.join(__dirname,"../public"));
const template_path=(path.join(__dirname,"../templates/views"));
const partials_path=(path.join(__dirname,"../templates/partials"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);


app.get("/register",(req,res)=>{
res.render("register");
});

// create a new user in our database
app.post("/register",async(req,res)=>{
try{
  

const password=req.body.password;
const cpassword=req.body.confirmpassword;

if(password===cpassword){

const registerStudent = new Register({
email : req.body.email,
password :password,
confirmpassword :cpassword,

});
 const registered =await registerStudent.save();
 res.send(`successfully registered ${registered}`);
 res.status(201).render("login");
}else{
res.send("passwords are not matching");
}

}catch(error){
res.status(400).send(error);
}
})
app.get("/login",(req,res)=>{
res.render("login");
})

app.listen(port,()=>{
console.log(`server is runing at port no ${port}`);
})
