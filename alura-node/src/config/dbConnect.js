import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URL);

let db = mongoose.connection;

export default db;