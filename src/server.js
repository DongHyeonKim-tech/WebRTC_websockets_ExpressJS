import express from "express";
import http from "http";
import WebSocket from "ws";
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
// app.get("/*", (req, res) => res.redirect("/"));
app.get("/*", (req, res) => req.params["0"] === "home" ? res.redirect("/public/js/app.js") : res.redirect("/"))

const handleListen = () => console.log("Listening on http://localhost:3000");
//// Express, http server 사용
// app.listen(3000, handleListen);

//// Websocket
// server 생성
const server = http.createServer(app);
// http와 ws 동시 사용 가능
const wss = new WebSocket.Server({ server });
// ws만 사용
// const wss = new WebSocket.Server();

// 각 browser socket 임시 보관
const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket.nickname = "Anon";
  // Front와 Connection 시, server에 log
  console.log("Connected to Browser");
  // Browser 끌 시 작동
  socket.on("close", () => console.log("Disconnected from the Browser"));
  // Front에서 message receive
  socket.on("message", (message) => {
    const msg = JSON.parse(message.toString('utf8'));
    // 각 browser의 socket에 message send
    switch (msg.type) {
      case "new_message":
        sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${msg.payload}`));
        break;
      case "nickname":
        socket.nickname = msg.payload;
        console.log(`${socket.nickname}`);
        break;
    }
  })
  // Front로 message send
  socket.send("hello!!");
})

server.listen(3000, handleListen);