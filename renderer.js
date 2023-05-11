const { ipcRenderer } = require("electron");

const sendButton = document.getElementById("sendButton");
const statusLabel = document.getElementById("statusLabel");

sendButton.addEventListener("click", () => {
	ipcRenderer.send("send-keys");
});

ipcRenderer.on("sending-keys", () => {
	statusLabel.innerHTML = "waiting to send keys...";
});

ipcRenderer.on("sent-keys", () => {
	statusLabel.innerHTML = "done";
});
