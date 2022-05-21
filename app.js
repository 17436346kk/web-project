const express = require('express')
const fs = require('fs')
const app = express();
const path= require('path')
const bodyparser= require("body-parser")
const port = 8000
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance');
var conSchema = mongoose.Schema({
    name: String,
    phone: String,
    email : String,
    concern: String
});
var Contact = mongoose.model('Contact', conSchema);



//for serving html static files
app.use("/static" , express.static("static"));
//for setting pug
app.set("view engine","pug");
//setting directory foldder for pug
app.set("views",path.join(__dirname,'views'));
app.use(express.urlencoded())

app.get('/home',(req,res)=>{
    const cntet ='hello'
    res.render("home.pug");
});



app.get('/contact',(req,res) =>{
    const cntet = 'hello this is first time we r using pug'
    const params={}
    res.render("contact.pug");
});

app.post('/contact',(req,res) =>{
    var myData= new Contact(req.body)
    myData.save().then(()=>{
        res.send("This data has been saved to database")
    }).catch(()=>{
        res.status(404).send("This item cant be save")
    })
});


app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});




