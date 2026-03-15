import mongoose from "mongoose";

// const personSchema = new mongoose.Schema({
// 	name: String,
// 	age: Number,
// 	email: String,
// });

const personSchema = new mongoose.Schema(
	{
		name: { type: String, required: true }, //multiple validators
		age: { type: Number, required: true },
		email: { type: String, required: true, unique: true },
		userOrder: { type: Object, default: {} },
	},
	{ timestamps: true, minimize: false }, //minimize helps to add property/key with empty value/data
);

export const Person = mongoose.model("Person", personSchema); //model name , model schema
