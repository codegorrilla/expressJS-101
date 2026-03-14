import express from "express";

const app = express();

const PORT = 3001;

app.get("/", (req, res) => {
	res.send("Hello, ExpressJS");
});

//app.use(express.json());

// handling multiple routes, using regex
// note: the regex pattern must be enclosed in parentheses *inside* the
// string and fully closed before the ending quote. otherwise Express will
// throw a PathError (unexpected '(').
app.use("/things/:name/:id", (req, res) => {
	const { name, id } = req.params;
	res.json({ id, name });
	//res.send(`User created: ${name} and ${id}`);
});

//catch all invalid routes
app.use((req, res) => {
	res.status(404).send("Sorry this is invalid URL.");
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
