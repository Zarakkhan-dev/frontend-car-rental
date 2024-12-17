import { useState } from "react";
import { useCreateCardMutation } from "../../store/slices/cardsApiSlice";

const CardDetails = () => {
  const initialState = {
    bank_name: "",
    holder_name: "",
    card_number: "",
    card_charge: "",
    due_date: "",
    year_fee: "",
    status: "",
    paid_amount: "",
    extra_pay: "",
    less_pay: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [validationError, setValidationError] = useState("");
  const [createCard, { isLoading, isError, isSuccess, error }] = useCreateCardMutation();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (validationError) setValidationError(""); // Reset validation error
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation: Check if any field is empty
    if (Object.values(formData).some((value) => !value.trim())) {
      setValidationError("All fields are required");
      return;
    }

    try {
      // Send data to API
      const response = await createCard({
        bank_name: formData.bank_name,
        holder_name: formData.holder_name,
        card_number: formData.card_number,
        card_charge: formData.card_charge,
        due_date: formData.due_date,
        year_fee: formData.year_fee,
        status: formData.status,
        paid_amount: formData.paid_amount,
        extra_pay: formData.extra_pay,
        less_pay: formData.less_pay,
      }).unwrap();

      if (response.status === "success") {
        setFormData(initialState); // Reset form fields
        alert("Bank detail added successfully");
      } else {
        alert("Failed to add bank detail");
      }

      setValidationError(""); // Clear validation error after submission
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to submit card details. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-200 shadow-md rounded-lg w-full" >
      <form action="" onSubmit={handleSubmit}>
      <div className="w-full h-56 overflow-hidden rounded-md relative mb-6">
        <img
          src="https://enews.hamariweb.com/wp-content/uploads/2023/12/Meezan-Bank-Debit-Card.jpg"
          alt="Card"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-2xl font-bold">
          Insert your Card Details!
        </div>
      </div>

      <h2 className="text-base font-bold mb-1 text-gray-600">Card Details</h2>
      <div className="border-b border-gray-500"></div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        {/* Render all fields dynamically */}
        {Object.keys(initialState).map((field) => (
          <div key={field}>
            <label className="block text-gray-500 font-medium capitalize">
              {field.replace("_", " ")}
            </label>
            {field === "due_date" ? (
              <input
                type="date"
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md outline-none"
              />
            ) : field === "status" ? (
              <select
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md outline-none"
              >
                <option value="">Select status</option>
                <option value="paid">paid</option>
                <option value="pending">pending</option>
                <option value="overdue">overdue</option>
              </select>
            ) : (
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md outline-none"
              />
            )}
          </div>
        ))}
      </form>

      {/* Display validation error */}
      {validationError && <p className="text-red-600 mt-2">{validationError}</p>}

      {/* Submit Button */}
      <div className="grid grid-cols-1 mt-4">
        <button
          type="submit"
          className="w-full bg-[#192236] text-white py-2 rounded-md font-semibold"
          disabled={isLoading}
        >
          Save Details
        </button>
      </div>

      {/* Loading or Error States */}
      {isLoading && <p className="text-blue-500">Submitting...</p>}
      {isError && (
        <p className="text-red-500">
          Error: {error?.data?.message || "Submission failed"}
        </p>
      )}
      </form>
    </div>
  );
};

export default CardDetails;
