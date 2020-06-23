var express=require("express");
var app=express()
var mongoose=require("mongoose");
var Mail=require("./models/email");
var methodOverride=require("method-override");
var bodyParser=require("body-parser");
app.use(methodOverride('_method'))

mongoose.connect("mongodb://localhost/dofos",{useNewUrlParser: true,useUnifiedTopology: true });




app.use(express.static(__dirname + '/'));

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",function(req,res){
	res.render("index.ejs")
});

app.get("/designs",function(req,res){
	res.render("portfolio.ejs")
});



app.post("/",function(req,res){
	var name=req.body.email_name;
	var email=req.body.email_mail;
	var subject=req.body.email_subject;
	var message=req.body.email_message;
	var mail={name:name, email:email, subject:subject, message:message};
	 Mail.create(mail,function(err,mail){
	 	if(err){
	 		console.log(err);
	 	}
		 res.redirect("/");
		 console.log(mail.email);
	 });
});




app.listen(3000,function(){
	console.log("Successfully connected")
})