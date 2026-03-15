import express from "express";
import { connectDB } from "./config/db.js";
import { Person } from "./models/Person.js";

const app = express();
app.use(express.json());
const port = 3000;
await connectDB();

app.get("/", (req, res) => {
	res.send("Welcome to MongoDB 101");
});

//Saving Data in MongoDB
app.post("/person", async (req, res) => {
	//console.log(req.body);
	const { name, age, email } = req.body;
	const newPerson = new Person({
		name,
		age,
		email,
	});

	await newPerson.save();
	console.log(newPerson);
	res.send("Person added");
});

//Updating data in MongoDB
app.put("/person", async (req, res) => {
	//console.log(req.body);
	const { id } = req.body;

	//const personData = await Person.find({ name, age });
	//const personData = await Person.findOne({ name, age }); //shows the first data
	//const personData = await Person.findById(id);
	const personData = await Person.findByIdAndUpdate(id, { age: "28" });
	//personData.age = 3;
	//await personData.save();
	console.log(personData);
	res.send("Person updated.");
});

//Deleting data from MongoDB
app.delete("/person/:id", async (req, res) => {
	const { id } = req.params;
	await Person.findByIdAndDelete(id);
	res.send("User deleted");
});

app.listen(port, () => {
	console.log("Server running successfully at " + port);
});
