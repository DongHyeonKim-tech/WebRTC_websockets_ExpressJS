//// Frontend

const socket = io();


socket.on("welcome", () => {
  addMessage(`Someone joined`);
});

socket.on("bye", () => {
  addMessage(`Someone lefted`);
});


const welcome = document.getElementById("welcome");
const room = document.getElementById("room");
room.hidden = true;
const roomSubmitForm = welcome.querySelector("form");
const roomChatForm = room.querySelector("form");

let roomName;

// message output func
const addMessage = (message) => {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
};
// send message to room
const handleMessageSubmit = (event) => {
  event.preventDefault();
  const input = roomChatForm.querySelector("input");
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${input.value}`);
  });
};
// receive message
socket.on("new_message", addMessage);
// show room and room chat input func
const showRoom = () => {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const form = room.querySelector("form");
  form.addEventListener("submit", handleMessageSubmit);
};
// enter room func
const handleRoomSubmit = (event) => {
  event.preventDefault();
  const input = roomSubmitForm.querySelector("input");
  // socket emit arg (event명(자유롭게), payload, 서버 호출 function)
  // 다양한 형태의 복수 arg를 자유롭게 send 가능
  // call back 함수는 마지막 자리에!
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
};

roomSubmitForm.addEventListener("submit", handleRoomSubmit);



