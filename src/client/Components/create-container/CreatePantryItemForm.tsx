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
        <input
          {...register("category", {
            required: true,
          })}
          type="text"
          placeholder="Category"
        />

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
          placeholder="Notify When?"
        />
        {/* <input
          {...register('expirationDate')}
          type='date'
          placeholder='Expiration Date'
        /> */}

        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Filling your pantry!" : "Submit"}
        </button>
      </form>
    </>
  );
};

export default CreatePantryItemForm;

/*useForm notes


*/
