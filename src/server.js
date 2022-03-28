import express from "express";
// Backend
const app = express();

// set view engine to pug(view engine을 pug로 세팅)
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

// set express static file(express에 template 위치 지정)
app.use("/public", express.static(__dirname + "/public"));

// set route(home.pug를 render해주는 route handler 생성)
// homepagae 이동 시 사용될 template rendering
app.get('/', (req, res) => res.render("home"));

// 다른 url 이동 시, home으로 이동
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on http://localhost:3000");
app.listen(3000, handleListen);