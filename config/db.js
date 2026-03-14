import mongoose from "mongoose";

export const connectDB = async () => {
	const MONGODB_URI =
		"mongodb+srv://codegorrilla_express_db:codeg123@expresscluster.qmvabcv.mongodb.net/?appName=ExpressCluster";

	await mongoose.connect(MONGODB_URI).then(() => {
		console.log("Database connected");
	});
};
