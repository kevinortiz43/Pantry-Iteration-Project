import { useState } from 'react';
import CreatePantryItemContainer from "../create-container/CreatePantryItemContainer"
import PantryItemContainer from "./PantryItemContainer"

import './pantry.css';


const PantryPage = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleItemCreated = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div>
            <section>
                <h2>Add new item</h2>
                <CreatePantryItemContainer onItemCreated={handleItemCreated}/>
            </section>

            <section>
                <h2>Current Items</h2>
                <PantryItemContainer refreshKey={refreshKey}/>
            </section>
        </div>
    )

}

export default PantryPage;