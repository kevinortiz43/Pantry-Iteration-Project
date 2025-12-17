import mongoose from 'mongoose';


const pantryItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Item name is required'],
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: 1,//do we want a minimum quantity of 1?
    default: 1,
  },
  notifyWhen: {
    type: Number,
    required: true,
    min: 0,//do we want a minimum quantity of 1?
    default: 0,
  },
});

const PantryItem = mongoose.model('PantryItem', pantryItemSchema);

export default PantryItem;