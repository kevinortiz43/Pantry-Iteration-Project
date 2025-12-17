import dotenv from 'dotenv';
import express, { type Express, type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import pantryController from './controllers/pantryController.ts';


dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const PORT: string | number = process.env.PORT || 3000;

const uri = process.env.MONGO_URI;

export const connectDb = async () => {
  try {
    await mongoose.connect(String("mongodb+srv://kevinortiz4300_db_user:BfrxDEGwDI2ZijjZ@cluster0.ozg4tp5.mongodb.net/?appName=Cluster0"));
    console.log("connected to mongo db testing ");
  } catch (error) {
    console.log("Error connecting to MONGODB", error);
    process.exit(1); // exit with failure
  }
};
connectDb();
const pantryRouter = express.Router();

//home page
app.use('/', pantryRouter);

//getPantryItem */ 

//  WORKS in Postman
// GET by item name
pantryRouter.get(
  '/:name',
  pantryController.getPantryItem,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.pantryItem);
  }
);

// WORKS in Postman
//GET full inventory
pantryRouter.get(
  '/',
  pantryController.getPantryInventory,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.inventory);
  }
);

// WORKS in Postman
//patch update item by name
pantryRouter.patch(
  '/:name',
  pantryController.updatePantryItem,
  (req: Request, res: Response) => {
    res.status(201).json(res.locals.updatedPantryItem);
  }
);

// WORKS in Postman
//DELETE item by nasme
pantryRouter.delete(
  '/:name',
  pantryController.deletePantryItem,
  (req, res, next) => {
    res
      .status(200)
      .send(`${res.locals.deletedPantryItem} deleted successfully`);
  }
);

// WORKS in Postman
//create item
pantryRouter.post(
  '/create',
  pantryController.createPantryItem,
  (req: Request, res: Response) => {
    res.status(201).json(res.locals.newPantryItem);
  }
);

//health check
// app.get('/health', (_req: Request, res: Response) => {
//   res.status(200).send('Server is running');
// });

// app.use((req, res) =>
//   res.status(404).send("This is not the page you're looking for...")
// );
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   const defaultErr = {
//     log: 'Express error handler caught unknown middleware error',
//     status: 500,
//     message: { err: 'An error occurred' },
//   };
//   const errorObj = Object.assign({}, defaultErr, err);
//   console.log(errorObj.log);
//   return res.status(errorObj.status).json(errorObj.message);
// });

export default app.listen(PORT, () => {
    console.log(`${process.env.PORT}`)
  console.log(`Server is running on PORT: ${PORT}`);
});
