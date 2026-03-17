import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();

const port = 3002;

app.use(express.json());
app.use(cookieParser());
app.use(
	session({
		secret: "sample-secret",
		resave: false,
		saveUninitialized: false,
	}),
);

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

const users = [];

app.post("/register", async (req, res) => {
	const { username, password } = req.body;
	users.push({
		username,
		password,
	});

	res.send("User registered.");
});

app.post("/login", async (req, res) => {
	const { username, password } = req.body;
	const user = users.find((u) => u.username === username);
	if (!user || password !== user.password) {
		return res.send("Not authorized");
	}

	req.session.user = user;

	res.send("User logged in.");
});

app.get("/dashboard", (req, res) => {
	if (!req.session.user) {
		return res.send("Unauthorized");
	}

	res.send(`Welcome ${req.session.user.username}`);
});

app.listen(port, () => {
	console.log(`Server running successfully at ${port}`);
});
