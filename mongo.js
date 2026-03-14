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
app.put("/person", express.json(), async (req, res) => {
	//console.log(req.body);
	const { id } = req.body;

	//const personData = await Person.find({ name, age });
	//const personData = await Person.findOne({ name, age }); //shows the first data
	const personData = await Person.findById(id);
	personData.age = 24;
	await personData.save();
	console.log(personData);
	res.send("Person updated.");
});

app.listen(port, () => {
	console.log("Server running successfully at " + port);
});
