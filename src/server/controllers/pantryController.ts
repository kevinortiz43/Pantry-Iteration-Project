import PantryItem from '../models/pantryModel';
import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

//create controller
const pantryController = {
 
  async createPantryItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next({
        log: 'Missing required fields',
        status: 400,
        message: { errors: errors.array() },
      });
    }
    try {
      const data = req.body;
     

      // const {name, category, quantity, unitType, threshold, expirationDate} = req.body;
      //data validation for required items
      if (!data.name || !data.category || !data.quantity || data.notifyWhen === undefined) {
        return next('Enter the required information (name & quantity)');
      }
      //data validation for data types
    if (typeof data.quantity !== 'number' || data.quantity < 1) {
      return next({
        log: 'Invalid quantity',
        status: 400,
        message: 'Quantity must be a number greater than 0',
      });
    }

    if (typeof data.notifyWhen !== 'number' || data.notifyWhen < 0) {
      return next({
        log: 'Invalid notifyWhen value',
        status: 400,
        message: 'NotifyWhen must be a non-negative number',
      });
    }

      const newPantryItem = await PantryItem.create({
        name: data.name,
        category: data.category,
        quantity: data.quantity,
        notifyWhen: data.notifyWhen,
      });
      res.locals.newPantryItem = newPantryItem;
      return next();
    } catch (err) {
      return next(err);
    }
  },
  //get individual pantry item: getPantryItem
  async getPantryItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const name = req.params.name;
      console.log(req.params['name']);
      res.locals.pantryItem = await PantryItem.find({ name: name });
      return next();
    } catch (err) {
      return next(err);
    }
  },
  //get entire inventory: getPantryInventory
  async getPantryInventory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const inventory = await PantryItem.find({});
      res.locals.inventory = inventory;
      console.log('Inventory retrieved: ', inventory);
      return next();
    } catch (err) {
      return next(err);
    }
  },

  //update: Patch(stretch)
  async updatePantryItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const currentItem = req.params.name;
      const updates = req.body;

      const updatedPantryItem = await PantryItem.findOneAndUpdate(
        { name: currentItem },
        { $set: updates },
        { new: true }
      );

      if (!updatedPantryItem) {
        res
          .status(404)
          .json({ message: `Pantry item ${currentItem} not found.` });
        return;
      }
      res.locals.updatedPantryItem = updatedPantryItem;
      return next();
    } catch (err) {
      return next(err);
    }
  },

  async deletePantryItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const name = req.params.name;
      const deletedPantryItem = await PantryItem.findOneAndDelete({
        name: name,
      });
      console.log(deletedPantryItem);
      if (!deletedPantryItem) {
        res.status(404).json({ message: `Pantry item ${name} not found.` });
        return;
      }
      console.log(`Deleted: ${deletedPantryItem}`);
      res.locals.deletedPantryItem = deletedPantryItem;
      return next();
    } catch (err) {
      return next(err);
    }
  },
};

export default pantryController;
