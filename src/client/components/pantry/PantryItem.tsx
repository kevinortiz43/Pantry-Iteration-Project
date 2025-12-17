import { useState, FormEvent } from "react";
import { X } from "lucide-react";
import "./pantry.css";

interface PantryItemType {
  _id?: string;
  name: string;
  category?: string;
  quantity: number;
  notifyWhen?: number;
  onButtonClick?: () => void;
  buttonDisabled?: boolean;
}

interface PantryItemProps {
  pantryItem: PantryItemType;
  pantryItemName: PantryItemType["name"];
  onItemDeleted: PantryItemType["onButtonClick"];
}

const PantryItem = ({ pantryItem, onItemDeleted }: PantryItemProps) => {
  const {
    name,
    category,
    quantity,
    notifyWhen,
    buttonDisabled = false,
  } = pantryItem;

  const [updateName, setUpdateName] = useState(name);
  const [updateCategory, setUpdateCategory] = useState(category || "");
  const [updateQuantity, setUpdateQuantity] = useState(quantity || 1);
  const [updateNotifyWhen, setUpdateNotifyWhen] = useState(notifyWhen || 0);
  const [isEditing, setIsEditing] = useState(false); // isEditing should be false (off) at start since user is not editng, just viewing

  const handleIsEditing = () => {
    setIsEditing((prev) => !prev); // toggle back and forth between is or isn't editing
  };

  const deleteItemClick = async (name: string) => {
    try {
      const response = await fetch(`http://localhost:3000/${name}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      if (response.ok) {
        onItemDeleted(); // trigger increment to trigger refresh key
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: FormEvent) => { // prevent default frontend beh with form submission so that it won't possibly refresh while user is in middle of filling out form
    e.preventDefault();

    const updatedItem = { 
      ...pantryItem, // make copy of existing pantryItem properties
      name: updateName, // then add the props that might be updated
      category: updateCategory,
      quantity: updateQuantity,
      notifyWhen: updateNotifyWhen,
    };

    try {
      const response = await fetch(`http://localhost:3000/${name}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem), // don't forget to updatedItem to request body
      });

      if (response.ok) {
        setIsEditing(false); // return isEditing back to false (off) 
        onItemDeleted(); // trigger increment to trigger refresh key
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="pantry-card">
      <div className="x-button-container">
        <button
          onClick={() => deleteItemClick(pantryItem.name)}
          className="x-button"
        >
          <X strokeWidth={1.25} />
        </button>
      </div>

      {isEditing ? ( // if isEditing truthy / on (they click on it, since it starts false / off) then open form
        <form onSubmit={handleSubmit} className="name-form">
          <input
            type="text"
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)} // on event, change state for each property
            className="form-input"
          />
        </form>
      ) : ( // otherwise just show existing prop's value
        <h3 className="name">{name.toUpperCase()}</h3>
      )}

      <ul className="listItems">
        {isEditing ? (
          <li className="form-field">
            <input
              type="text"
              value={updateCategory}
              onChange={(e) => setUpdateCategory(e.target.value)}
              placeholder="Category"
              className="form-input"
            />
          </li>
        ) : (
          category && (
            <li className="category">Category: {category.toLowerCase()}</li>
          )
        )}

        {isEditing ? (
          <li className="form-field">
            <input
              type="number"
              value={updateQuantity}
              onChange={(e) => setUpdateQuantity(Number(e.target.value))}
              min="1" // prevent quantity from going lower than 1
              className="form-input"
            />
          </li>
        ) : (
          <li className="quantity">Quantity: {quantity}</li>
        )}

        {isEditing ? (
          <li className="form-field">
            <input
              type="number"
              value={updateNotifyWhen}
              onChange={(e) => setUpdateNotifyWhen(Number(e.target.value))}
              min="0" // prevent quantity from going lower than 0
              className="form-input"
            />
          </li>
        ) : (
          <li className="notifyWhen">Notify When? {notifyWhen}</li>
        )}
      </ul>

      <div className="button-container">
        {isEditing ? ( // if isEditing truthy (user clicks on it), then we see Save and Cancel buttons
          <>
            <button
              type="submit"
              onClick={handleSubmit} // this triggers PATCH
              className="save-button"
            >
              Save
            </button>

            <button
              onClick={() => setIsEditing(false)} // with cancel, we turn back isEditing to false (off)
              className="cancel-button"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleIsEditing} // Update button toggles isEditing state true / false (on / off)
            disabled={buttonDisabled}
            className="update-button"
          >
            Update
          </button>
        )}
      </div>
    </article>
  );
};

export default PantryItem;
