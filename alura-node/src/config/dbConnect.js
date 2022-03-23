import mongoose from "mongoose";

mongoose.connect("mongodb+srv://alura:123@cluster0.9pb34.mongodb.net/alura-node1");

let db = mongoose.connection;

export default db;