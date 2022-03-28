import express from "express";
import http from "http";
import SocketIO from "socket.io";

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
// app.get("/*", (req, res) => req.params["0"] === "home" ? res.redirect("/socket.io/socket.io.js") : res.redirect("/"))


// server 생성
const server = http.createServer(app);

const wsServer = SocketIO(server);

const backendDone = (msg) => {
  console.log("Backend done: " + msg);
}

wsServer.on("connection", (socket) => {
  
  socket.on("enter_room", (msg, done) => {
    console.log(msg.payload);
    setTimeout(() => {
      done("hello from backend");
    }, 5000);
  });

});

server.listen(3000);