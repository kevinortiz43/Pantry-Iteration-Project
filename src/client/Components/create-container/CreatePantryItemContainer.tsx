import './createContainer.css';
import CreatePantryItemForm from './CreatePantryItemForm';

const CreatePantryItemContainer = ( {onItemCreated}: CreateItemContainerProps) => {
  return (
    <>
      <div className='create-container'>
      <CreatePantryItemForm onItemCreated={onItemCreated}/>
      </div>
    </>
  );
};

export default CreatePantryItemContainer;
