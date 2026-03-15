import express from "express";
import cookieParser from "cookie-parser";

const app = express();
const port = 3002;

app.use(cookieParser());

app.get("/", (req, res) => {
	//res.cookie("name", "express-app", { maxAge: 360000 });
	res.cookie("name", "express-app");
	res.send("Cookies 101");
});

app.get("/fetch", (req, res) => {
	console.log(req.cookies);
	res.send("API called");
});

app.get("/remove-cookie", (req, res) => {
	res.clearCookie("name");
	res.send("Cookie cleared.");
});

app.listen(port, () => {
	console.log(`Server running successfully at ${port}`);
});
