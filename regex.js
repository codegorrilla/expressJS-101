import express from "express";

const regApp = express();
const PORT = 5000;

regApp.get("/", (req, res) => {
	res.send("Welcome to Cookies.");
});

//Route 1: Matches /users/ plus a 5-digit number, e.g. /users/12345
regApp.get(/^\/users\/(\d{5})$/, (req, res) => {
	const userId = req.params[0];
	console.log(userId);

	res.send(`User route: User id is ${userId} (exactly 5 digits)`);
});

regApp.listen(PORT, () => {
	console.log(`Server running Successfully at ${PORT}`);
});
