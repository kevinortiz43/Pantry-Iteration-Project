import { useForm, type SubmitHandler } from "react-hook-form";
// import { z } from 'zod';
import "./createContainer.css";

const PORT = 3000;

//I'll go down a rabbit hole if I keep looking at data validation.
// const schema = z.object({
//   name: z.string().required("Item is required");

// });

type FormFields = {
  _id?: string;
  name: string;
  category: string;
  quantity: number;
  notifyWhen: number;
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
    formState: { isSubmitting },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // if (!data) return;
    // Don't need a proxy set up in vite.config.ts because explicitly using full URL with http://localhost:3000/create in  fetch call. A proxy is only needed if want to make relative URL requests (like "/create") and have them automatically forwarded to your backend.

    try {
      const response = await fetch(`http://localhost:${PORT}/create`, {
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
          defaultValue=""
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
          <option value="Canned & Dry Goods">
            Canned & Dry Goods
          </option>
          <option value="Prepared & Deli Foods">Prepared & Deli Food</option>
          <option value="Produce">Produce</option>
          <option value="Seafood">Seafood</option>
          <option value="Snacks & Sweets">Snacks & Sweets</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Other">Other</option>
        </select>

        <input
          {...register("quantity", {
            required: true,
            valueAsNumber: true,
          })}
          type="number"
          placeholder="Quantity"
          min="1"
        />

        {/* <input {...register('unitType')} type='text' placeholder='Unit Type' /> */}
        <input
          {...register("notifyWhen", {
            required: true,
            valueAsNumber: true,
          })}
          type="number"
          placeholder="Notify When"
          min="0"
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
