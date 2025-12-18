import dotenv from "dotenv";
import express, { type Express } from "express";
import cors from "cors";


import pantryRouter from "./routes/api.ts";
import { connectDb } from "./db/db.ts";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const PORT: string | number = process.env.PORT || 3000;


connectDb();

//home page
app.use("/", pantryRouter);



export default app.listen(PORT, () => {
  console.log(`${process.env.PORT}`);
  console.log(`Server is running on PORT: ${PORT}`);
});
