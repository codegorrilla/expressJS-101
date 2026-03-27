import express from "express";

const app = express();

app.use(express.json());

const port = 5000;

app.get("/", (req, res) => {
	res.send("Building RESTful API 101");
});

// get all product
app.get("/api/products", (req, res) => {
	const products = [
		{ id: 1, name: "Laptop", price: 1000 },
		{ id: 2, name: "Mobile", price: 500 },
	];

	res.status(200).json({ products });
});

//get a single product
app.get("/api/products/:id", (req, res) => {
	const products = [
		{ id: 1, name: "Laptop", price: 1000 },
		{ id: 2, name: "Mobile", price: 500 },
	];

	const product = products.find((p) => p.id === Number(req.params.id));

	if (!product) {
		return res.status(404).json({ message: "Product not found" });
	}

	res.status(200).json({ product });
});

// create a new product
app.post("/api/products/", (req, res) => {
	const newProduct = req.body;
	newProduct.id = Date.now();

	res.status(201).json(newProduct);
});

app.listen(port, () => {
	console.log(`Server running successfully at port: ${port}`);
});
