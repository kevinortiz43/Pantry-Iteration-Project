import express, {
  type Express,
  type Request,
  type Response,
  type NextFunction,
} from "express";

import pantryController from "../controllers/pantryController.ts";

const pantryRouter = express.Router();

//  WORKS in Postman
// GET by item name

// pantryRouter.get("/:name",pantryController.getPantryItem,(req: Request, res: Response) => {
//     res.status(200).json(res.locals.pantryItem);
//   }
// );

pantryRouter.get("/:name", pantryController.getPantryItem);
// WORKS in Postman
//GET full inventory
pantryRouter.get("/", pantryController.getPantryInventory);

// WORKS in Postman
//patch update item by name
// pantryRouter.patch(
//   "/:name",
//   pantryController.updatePantryItem,
//   (req: Request, res: Response) => {
//     res.status(201).json(res.locals.updatedPantryItem);
//   }
// );

pantryRouter.patch("/:name", pantryController.updatePantryItem);

// WORKS in Postman
//DELETE item by nasme
// pantryRouter.delete(
//   "/:name",
//   pantryController.deletePantryItem,
//   (req, res, next) => {
//     res
//       .status(200)
//       .send(`${res.locals.deletedPantryItem} deleted successfully`);
//   }
// );

pantryRouter.delete("/:name", pantryController.deletePantryItem);

// WORKS in Postman
//create item
// pantryRouter.post(
//   "/create",
//   pantryController.createPantryItem,
//   (req: Request, res: Response) => {
//     res.status(201).json(res.locals.newPantryItem);
//   }
// );

pantryRouter.post("/create", pantryController.createPantryItem);
export default pantryRouter;
