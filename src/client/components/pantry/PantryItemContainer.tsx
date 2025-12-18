import { useState, useEffect } from "react";
import "./pantry.css";

import PantryItem from "./PantryItem.tsx";

interface PantryItemType {
  _id?: string;
  name: string;
  category?: string;
  quantity: number;
  // unitType?: string;
  notifyWhen?: number;
  onButtonClick?: () => void;
  // expirationDate?: string;
}

interface PantryItemContainerProps {
  refreshKey?: number;
  pantryItem: PantryItemType;
  pantryItemName: PantryItemType["name"];
  onItemDeleted: PantryItemType["onButtonClick"];
}

const PantryItemContainer = ({
  refreshKey = 0,
  onItemDeleted, // pass this increment function from PantryPage.tsx (function used to trigger page refresh)
}: PantryItemContainerProps) => {
  const [pItems, setPItems] = useState<PantryItemType[]>([]);

  useEffect(() => {
    async function getPantryItems() {
      const response = await fetch("http://localhost:3000");
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const items = await response.json();
      setPItems(items);
    }
    getPantryItems();
    return;
  }, [refreshKey]); // trigger page refresh whenever increment function (defined in PantryPage.tsx) is run

  console.log(`Items: ${pItems}`);

  return (
    <div className="pantry-container">
      {pItems.map((pItem) => (
        <PantryItem
          key={pItem._id}
          pantryItem={pItem}
          pantryItemName={pItem.name}
          onItemDeleted={onItemDeleted} // pass down increment function prop so it's available in PantryItem.tsx
        />
      ))}
    </div>
  );
};

export default PantryItemContainer;
