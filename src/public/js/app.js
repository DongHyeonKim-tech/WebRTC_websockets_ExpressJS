//// Frontend

// Front, Back Connection by Websocket
const socket = new WebSocket(`ws://${window.location.host}`);
// ul, form
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");

// Backend와 연결 시, Browser에 log
socket.addEventListener("open", () => {
  console.log("Connected to Server");
});

// Backend에서 send한 message receive
socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

// Backend server 종료 시, Browser에 log
socket.addEventListener("close", () => {
  console.log("Disconnected to Server");
})

// const handleSubmit = (event) => {
//   event.preventDefault();
//   const input = messageForm.querySelector("input");
//   socket.send(input.value);
//   console.log("input.value: ",input.value);
//   input.value = "";
// };
const makeMessage = (type, payload) => {
  const msg = {type, payload};
  return JSON.stringify(msg);
};

const handleSubmit = (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input")
  socket.send(makeMessage("new_message", input.value));
  const li = document.createElement("li");
  li.innerText = `YOU: ${input.value}`;
  messageList.append(li);  
  input.value = "";
};

const handleNickSubmit = (event) => {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
}



messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);