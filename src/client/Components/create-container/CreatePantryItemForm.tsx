import { useForm, type SubmitHandler } from "react-hook-form";
// import { z } from 'zod';
import "./createContainer.css";

//I'll go down a rabbit hole if I keep looking at data validation.
// const schema = z.object({
//   name: z.string().required("Item is required");

// });

type FormFields = {
  _id?: string;
  name: string;
  category?: string;
  quantity: number;
  // unitType?: string;
  notifyWhen?: number;
  // expirationDate?: Date;
};

// need to create a callback to notify parent component PantryPage.tsx
interface CreatePantryItemFormProps {
  onItemCreated?: () => void;
}

const CreatePantryItemForm = ({ onItemCreated }: CreatePantryItemFormProps) => {
  // pass down prop from parent

  const {
    register,
    handleSubmit,
    setError,
    reset, // to clear form after submission
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // if (!data) return;

    try {
      const response = await fetch("http://localhost:3000/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // checks if response is ok (not only whether or not it exists)
      if (!response.ok) throw new Error(`failed to create item`);

      const result = await response.json();
      console.log("Response: ", result);

      if (onItemCreated) {
        onItemCreated();
      }

      reset();
    } catch (err) {
      setError("name", {
        message: "failed to create item",
      });
      console.error("error creating pantry item:", err);
    }
  };
  return (
    <>
      <form className="create-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", {
            required: true,
          })}
          type="text"
          placeholder="Name"
        />
        <select
          {...register("category", {
            required: true,
          })}
          required
        >
          {/* <input type="text" placeholder="Category" /> */}
            <option value="" disabled selected>
              Categories
            </option>
            <option value="Beverages">Beverages</option>
            <option value="Dairy & Eggs">Dairy & Eggs</option>
            <option value="Fruit">Fruit</option>
            <option value="Frozen Foods">Frozen Foods</option>
            <option value="Meat and Poultry">Meat and Poultry</option>
            <option value="Pantry (Canned & Dry Goods)">
              Pantry (Canned & Dry Goods)
            </option>
            <option value="Prepared & Deli Foods">Prepared & Deli Food</option>
            <option value="Produce">Produce</option>
            <option value="Seafood">Seafood</option>
            <option value="Snacks & Sweets">Snacks & Sweets</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Other">Other</option>

          </select>

        {/* To put as dropdown:
        <label> 
                <select name="selectedFruit">
                  <option value="apple">Apple</option>
                  <option value="banana">Banana</option>
                  <option value="orange">Orange</option>
                </select>
              </label> */}

        {/* Bakery
              Beverages
              Dairy & Eggs
              Fruit
              Frozen Foods
              Meat & Poultry
              Other
              Pantry (Canned & Dry Goods)
              Prepared & Deli Foods
              Produce
              Seafood
              Snacks & Sweets
              Vegetables 
        */}

        <input
          {...register("quantity", {
            required: true,
            min: { value: 1, message: "quantity must be at least 1" },
            valueAsNumber: true,
          })}
          type="number"
          placeholder="Quantity"
        />

        {/* <input {...register('unitType')} type='text' placeholder='Unit Type' /> */}
        <input
          {...register("notifyWhen", { required: true, valueAsNumber: true })}
          type="number"
          placeholder="Notify When"
        />
        {/* <input
          {...register('expirationDate')}
          type='date'
          placeholder='Expiration Date'
        /> */}
        <div className="submit-btn-container">
          <button disabled={isSubmitting} type="submit" className="submit-btn">
            {isSubmitting ? "Filling your pantry!" : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CreatePantryItemForm;

/*useForm notes


*/
