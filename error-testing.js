import express from "express";

const app = express();
app.use(express.json());

//this will handle the uncaught errors and prevent the app from crashing
process.on("uncaughtException", (err) => {
	//event name, handler function
	console.log(err);
	process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
	console.log(reason);
});

app.get("/", (req, res) => {
	res.send("Welcome to Error handling");
});

//synchronous error
app.get("/sync-error", (req, res, next) => {
	try {
		throw new Error("Something went wrong!");
	} catch (error) {
		next(error);
	}
});

//asynchronous error
app.get("/async-error", async (req, res, next) => {
	try {
		await Promise.reject(new Error("Async error occured"));
	} catch (error) {
		next(error);
	}
});

//global error handling middleware
app.use((err, req, res, next) => {
	console.error(err.message);
	console.log(err.stack);

	res.status(500).json({ message: err.message });
});

const port = 3002;

app.listen(port, () => {
	console.log(`Server running successfully at port : ${port}`);
});
