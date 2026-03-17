import express from "express";
import session from "express-session";

const app = express();
const port = 3002;

app.use(
	session({
		secret: "sample-secret",
		resave: false,
		saveUninitialized: false,
	}),
);

app.get("/", (req, res) => {
	res.send("Sessions 101");
});

//basic page_view session
app.get("/visit", (req, res) => {
	if (req.session.page_views) {
		req.session.page_views++;
		res.send(`You visited this page ${req.session.page_views} times.`);
	} else {
		req.session.page_views = 1;
		res.send("Welcome to this page for the first time.");
	}
});

app.get("/remove-visit", (req, res) => {
	req.session.destroy();
	res.send("Session removed.");
});

app.listen(port, () => {
	console.log(`Server running successfully at ${port}`);
});
