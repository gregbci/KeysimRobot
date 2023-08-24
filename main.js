const { app, ipcMain, BrowserWindow } = require("electron");

// two ways to control keyboard
const robot = require("robotjs");
const { keyboard, Key } = require("@nut-tree/nut-js");

let win = null;

app.whenReady().then(() => {
	win = createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on("window-all-closed", function () {
	console.log("Bye");
	app.quit();
});

function createWindow() {
	const win = new BrowserWindow({
		width: 640,
		height: 480,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});
	win.loadFile("index.html");
	return win;
}

ipcMain.on("send-keys", async () => {
	await sendKeys();
});

async function sendKeys() {
	// Wait a bit to change focus
	const delay = 3;
	win.webContents.send("sending-keys");
	await sleep(delay);

	// send keys using desired module
	//await typeRobot();
	//await pressRobot();
	//await typeNutJS();
	await pressNutJS();

	win.webContents.send("sent-keys");
}

async function sleep(seconds) {
	return new Promise((resolve) => setTimeout(resolve, seconds * 1000.0));
}

async function typeRobot() {
	robot.setKeyboardDelay(10);

	robot.keyTap("r");
	robot.keyTap("o");
	robot.keyTap("b");
	robot.keyTap("o");
	robot.keyTap("t");
}

// this doesn't actually hold the key down
async function pressRobot() {
	robot.keyToggle("w", "down");
	await sleep(2);
	robot.keyToggle("w", "up");
	robot.keyToggle("s", "down");
	await sleep(2);
	robot.keyToggle("s", "up");
}

async function typeNutJS() {
	keyboard.config.autoDelayMs = 10;
	await keyboard.type("nut.js");
}

// this doesn't actually hold the key down
async function pressNutJS() {
	await keyboard.pressKey(Key.W);
	await sleep(2);
	await keyboard.releaseKey(Key.W);
	await keyboard.pressKey(Key.S);
	await sleep(2);
	await keyboard.releaseKey(Key.S);
}
