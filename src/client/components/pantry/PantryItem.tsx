import './pantry.css';

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

const PantryItem = ({ pantryItem }: PantryItemProps) => {
  // deconstruct pantryItem
  const { name, category, quantity, notifyWhen, onButtonClick, buttonDisabled = false } =
  // const { name, category, quantity, unitType, threshold, onButtonClick, buttonDisabled = false } =
  pantryItem;


  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
    console.log("button works");
  }
  return (
    <>
      <article className='pantry-card'>

        <h3 className='name'> {name.toUpperCase()}</h3>
        <ul className='listItems'>
          {category && <li className='category'>Category: {category.toLowerCase()}</li>}
          <li className='quantity'>Quantity: {quantity}</li>
          {/* {unitType && <li className='unitType'>Unit: { unitType.toLowerCase() }</li>} */}
          {notifyWhen && <li className='notifyWhen'>Buy more if you have less than {notifyWhen}</li>}
          {/* {expirationDate && <li className='expirationDate'>Expiration date: { formatExpirationDate(expirationDate) }</li>} */}
        </ul>
        <div className="button-container">
          <button onClick={handleClick}
            disabled={buttonDisabled}
            className="button">Update Item</button>
          <button onClick={handleClick}
            disabled={buttonDisabled}
            className="button">Delete Item</button>
        </div>

      </article>
    </>
  );
};

export default PantryItem;
