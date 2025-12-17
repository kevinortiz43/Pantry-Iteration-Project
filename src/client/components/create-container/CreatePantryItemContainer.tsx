import { Plus } from "lucide-react";
import "./createContainer.css";
import CreatePantryItemForm from "./CreatePantryItemForm";

const CreatePantryItemContainer = ({
  onItemCreated,
}: CreateItemContainerProps) => {
  return (
    <div className="create-container">
      <div className="create-container-title-form">
        <div className="create-container-title">
          <Plus strokeWidth={1.25} />
          <p>Add A New Item</p>
        </div>
        <div className="form-container">
          <CreatePantryItemForm onItemCreated={onItemCreated} />
        </div>
      </div>
    </div>
  );
};

export default CreatePantryItemContainer;
