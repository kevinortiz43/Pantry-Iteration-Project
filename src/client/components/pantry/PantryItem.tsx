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

  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
    console.log("button works");
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
        <h3 className="name"> {name.toUpperCase()}</h3>
        <ul className="listItems">
          {category && (
            <li className="category">Category: {category.toLowerCase()}</li>
          )}
          <li className="quantity">Quantity: {quantity}</li>
          {/* {unitType && <li className='unitType'>Unit: { unitType.toLowerCase() }</li>} */}

          <li className="notifyWhen">Notify When? {notifyWhen}</li>

          {/* {expirationDate && <li className='expirationDate'>Expiration date: { formatExpirationDate(expirationDate) }</li>} */}
        </ul>
        <div className="button-container">
          <button
            onClick={handleClick}
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
