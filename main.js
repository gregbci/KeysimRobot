const { app, ipcMain, BrowserWindow } = require("electron");
const robot = require("robotjs");

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

	// Set delay to something reasonable, setting to zero causes keystrokes to be missed
	robot.setKeyboardDelay(10);

	// Send individual keyboard commands
	robot.keyTap("h");
	robot.keyTap("e");
	robot.keyTap("l");
	robot.keyTap("l");
	robot.keyTap("o");
	win.webContents.send("sent-keys");
}

async function sleep(seconds) {
	return new Promise((resolve) => setTimeout(resolve, seconds * 1000.0));
}
