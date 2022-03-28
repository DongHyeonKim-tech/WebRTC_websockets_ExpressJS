//// Frontend

const socket = io();

const welcomeDiv = document.getElementById("welcome");

const form = welcomeDiv.querySelector("form");

const backendDone = (msg) => {
  console.log("Backend done: " + msg);
};


const handleRoomSubmit = (event) => {
  event.preventDefault();
  const input = form.querySelector("input");
  // socket emit arg (event명(자유롭게), payload, 서버 호출 function)
  // 다양한 형태의 복수 arg를 자유롭게 send 가능
  // call back 함수는 마지막 자리에!
  socket.emit("enter_room", { payload: input.value }, backendDone);
  input.value = "";
};

form.addEventListener("submit", handleRoomSubmit);