import { useState, type SetStateAction } from "react";
import { X } from "lucide-react";
import "./pantry.css";

interface PantryItemType {
  _id?: string;
  name: string;
  category?: string;
  quantity: number;
  notifyWhen?: number;
  // unitType?: string;
  // threshold?: number;
  // expirationDate?: string;
  onButtonClick?: () => void;
  // buttonText?: string;
  buttonDisabled?: boolean;
}

interface PantryItemProps {
  pantryItem: PantryItemType;
  pantryItemName: PantryItemType["name"];
  onItemDeleted: PantryItemType["onButtonClick"];
}

// function to convert Date to a React readable format
// const formatExpirationDate = (date?: Date): string => {
//   if (!date) {
//     return "N/A";
//   }
//   return new Intl.DateTimeFormat('en-US', {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//   }).format(date);
// };

const PantryItem = ({ pantryItem, onItemDeleted }: PantryItemProps) => {
  // deconstruct pantryItem
  const {
    name,
    category,
    quantity,
    notifyWhen,
    onButtonClick,
    buttonDisabled = false,
  } =
    // const { name, category, quantity, unitType, threshold, onButtonClick, buttonDisabled = false } =
    pantryItem;

  const [updateName, setUpdateName] = useState(name);
  const [updateCategory, setUpdateCategory] = useState(category);
  const [updateQuantity, setUpdateQuantity] = useState(quantity);
  const [updateNotifyWhen, setNotifyWhen] = useState(notifyWhen);

  const [isEditing, setIsEditing] = useState(true); // check to see if being edited

  // use some kind of state to track form
  const [formData, setFormData] = useState({
    // ...pantryItem, // make copy of entire pantryItem
    // quantity: pantryItem.quantity || 1,
    // notifyWhen: pantryItem.notifyWhen || 0,
  });

  const handleIsEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const deleteItemClick = async (name: string) => {
    console.log(name);

    try {
      await fetch(`http://localhost:3000/${name}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      onItemDeleted(); // increment to trigger refresh in useEffect()
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setUpdateName(event.target.value);
  };

  return (
    <>
      <article className="pantry-card">
        <div className="x-button-container">
          <button
            onClick={() => deleteItemClick(pantryItem.name)}
            className="x-button"
          >
            <X strokeWidth={1.25} />
          </button>
        </div>
        {isEditing ? (
          <h3 className="name"> {name.toUpperCase()}</h3>
        ) : (
          <form className="name">
            <input
              type="text"
              value={updateName.toUpperCase()}
              onChange={handleChange}
            ></input>
          </form>
        )}

        <ul className="listItems">
          {isEditing ? (
            category && (
              <li className="category">Category: {category.toLowerCase()}</li>
            )
          ) : (
            <form className="category">
              <input
                type="text"
                value={category.toLowerCase()}
                onChange={handleChange}
              ></input>
            </form>
          )}

          {isEditing ? (
            <li className="quantity">Quantity: {quantity}</li>
          ) : (
            <form className="quantity">
              <input
                type="number"
                value={quantity}
                onChange={handleChange}
              ></input>
            </form>
          )}
          {isEditing ? (
            <li className="notifyWhen">Notify When? {notifyWhen}</li>
          ) : (
            <form className="notifyWhen">
              <input
                type="number"
                value={notifyWhen}
                onChange={handleChange}
              ></input>
            </form>
          )}
        </ul>
        <div className="button-container">
          <button
            onClick={handleIsEditing}
            disabled={buttonDisabled}
            className="update-button"
          >
            Update
          </button>
        </div>
      </article>
    </>
  );
};

export default PantryItem;
