import express from 'express';
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { engine } from 'express-handlebars';
import flash from 'connect-flash';

const app= express()
const PORT=3000;
//config
//sessao
app.use(session({
	secret: "portfolio",
	resave: true,
	saveUninitialized: true
	}))
	app.use(flash())

	//midleware
	app.use((req, res, next)=>{
	  res.locals.success_msg = req.flash("success_msg")
	  res.locals.error_msg= req.flash("error_msg")
	  res.locals.error=req.flash("error")
	  res.locals.user = req.user || null
	  next()
	})  
  //body parser
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  //handlebars
  app.engine("handlebars", engine());
  app.set("view engine", "handlebars");
  app.use("/images", express.static(path.join(__dirname, "/public/images")));
  app.set("views", "./views");
  //Public
  app.use(express.static(path.join(__dirname, "public")));
  
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.get("/portfolio",(req,res)=>{
	res.render("index");
})

app.get("/portfolio/about",(req,res)=>{
	res.render("about");
})

app.get("/portfolio/contact",(req,res)=>{
	res.render("contact");
})

app.get("/portfolio/links",(req,res)=>{
	res.render("links");
})

app.listen(PORT, () => {
	console.log('listening on port 3000!');
});