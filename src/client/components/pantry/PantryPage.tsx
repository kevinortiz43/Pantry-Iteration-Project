import { useState } from "react";
import CreatePantryItemContainer from "../create-container/CreatePantryItemContainer";
import PantryItemContainer from "./PantryItemContainer";

import "./pantry.css";

// pass down handleItemChange function -> PantryItemContainer.tsx (where useEffect has refreshKey in dependency array) -> PantryItem.tsx: triggered by DELETE X button and save (for PATCH) button
// pass down handleItemChange function -> CreatePantryItemContainer.tsx -> CreateItemPantryForm.tsx: triggered by submit button for POST (create) item
const PantryPage = () => {
  const [refreshKey, setRefreshKey] = useState(0); // we use this to trigger refresh

  const handleItemChange = () => {
    // increment function is run every time we POST (create) item, DELETE item, or PATCH item in order to trigger a refresh
    setRefreshKey((prev) => prev + 1);
  };

  // pass down handleItemChange and refreshKey
  return (
    <div>
      <section>
        <CreatePantryItemContainer onItemChange={handleItemChange} />
      </section>

      <section>
        <h2>Current Items:</h2>
        <PantryItemContainer
          refreshKey={refreshKey}
          onItemChange={handleItemChange}
        />
      </section>
    </div>
  );
};

export default PantryPage;
