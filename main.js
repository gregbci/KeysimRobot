// Type "Hello World" then press enter.
var robot = require("robotjs");

/**
 * Wait for the specified number of miliseconds using setTimeout
 */
async function sleep(seconds) {
	return new Promise((resolve) => setTimeout(resolve, seconds * 1000.0));
}

/**
 * Main function, the first time this is run, the OS will ask the user if they
 * will allow the application to use accessibiity features.
 */
async function main() {

	// Wait a bit to change focus
	const delay = 3;
	console.log("Will send keystrokes in " + delay + " seconds");
	await sleep(delay);

	// Set delay to something reasonable, setting to zero causes keystrokes to be missed
	robot.setKeyboardDelay(100);

	// Send individual keyboard commands
	robot.keyTap("h");
	robot.keyTap("e");
	robot.keyTap("l");
	robot.keyTap("l");
	robot.keyTap("o");
}

main();



