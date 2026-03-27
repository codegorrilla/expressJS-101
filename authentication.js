import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
const port = 5001;
const users = [];

app.get("/", (req, res) => {
	res.send("Welcome to Node authentication.");
});

app.post("/register", async (req, res) => {
	const { username, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10); //range 5-15
	users.push({
		username,
		password: hashedPassword,
	});

	res.send("User registered.");
});

app.post("/login", async (req, res) => {
	const { username, password } = req.body;
	const user = users.find((u) => u.username === username);
	if (!user || !(await bcrypt.compare(password, user.password))) {
		return res.send("Not authorized");
	}

	const token = jwt.sign({ username }, "test#secret"); //data, secret key
	res.json({ token });

	res.send("User logged in.");
});

app.get("/dashboard", (req, res) => {
	try {
		const token = req.header("Authorization");
		const decodedToken = jwt.verify(token, "test#secret");

		if (decodedToken.username) {
			res.send(`Welcome ${decodedToken.username}`);
		} else {
			res.send("Access denied");
		}
	} catch (err) {
		res.send("Access denied");
	}
});

app.listen(port, () => {
	console.log(`Server running successfully at port ${port}`);
});
