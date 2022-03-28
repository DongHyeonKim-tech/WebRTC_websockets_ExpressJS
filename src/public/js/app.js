//// Frontend

// Front, Back Connection by Websocket
const socket = new WebSocket(`ws://${window.location.host}`);

// Backend와 연결 시, Browser에 log
socket.addEventListener("open", () => {
  console.log("Connected to Server");
});

// Backend에서 send한 message receive
socket.addEventListener("message", (message) => {
  console.log("New message: ",message.data," from the server");
});

// Backend server 종료 시, Browser에 log
socket.addEventListener("close", () => {
  console.log("Disconnected to Server");
})

// Front to Back send message
setTimeout(() => {
  socket.send("hello from the browser!");
}, 3000);