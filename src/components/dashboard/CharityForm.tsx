import { useState, useRef } from "react";
import {
  BankDetails,
  type BankDetails as BankDetailsType
} from "../ui/bank-details";
import { toast } from "react-hot-toast";
import { Upload } from "lucide-react";
import { CustomForm, FormField } from "../ui/custom-form";
import { createCharity } from "../../services/api";
import { useNavigate } from "react-router-dom";

function CharityForm() {
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [bankDetails, setBankDetails] = useState<BankDetailsType | undefined>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const fields: FormField[] = [
    { name: "name", label: "Organization Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    {
      name: "phone_number",
      label: "Phone Number",
      type: "tel",
      required: true
    },
    { name: "address", label: "Address", type: "text", required: true },
    { name: "website", label: "Website", type: "url", required: true },
    { name: "areaOfFocus", label: "Area of Focus", type: "text" },
    {
      name: "bankDetails",
      label: "Bank Details",
      type: "custom",
      render: () => (
        <BankDetails
          value={bankDetails}
          onChange={(details) => setBankDetails(details)}
        />
      )
    }
  ];

  const handleSubmit = async (data: any) => {
    try {
      const logoFile = fileInputRef.current?.files?.[0];

      // Validation checks
      if (!logoFile) {
        toast.error("Please upload a logo.");
        return;
      }

      if (
        !bankDetails?.account_name ||
        !bankDetails?.bank_code ||
        !bankDetails?.bank_name ||
        !bankDetails?.account_number
      ) {
        toast.error("Please complete the bank details.");
        return;
      }

      if (
        !data.name ||
        !data.email ||
        !data.phone_number ||
        !data.address ||
        !data.website
      ) {
        toast.error("Please fill out all required fields.");
        return;
      }

      // Prepare FormData for submission
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone_number", data.phone_number);
      formData.append("address", data.address);
      formData.append("website", data.website);
      formData.append("areaOfFocus", data.areaOfFocus); // If empty, send empty string
      formData.append("logo", logoFile); // Attach logo file

      // Append bank details as a stringified JSON object
      // Append individual bank details fields
      formData.append("bank_code", bankDetails?.bank_code);
      formData.append("bank_name", bankDetails?.bank_name);
      formData.append("account_number", bankDetails?.account_number);
      formData.append("account_name", bankDetails?.account_name);

      // Submit to API
      const response = await createCharity(formData); // Assuming createCharity handles multipart requests
      if (response.status === 201) {
        toast.success("Form submitted successfully.");
        navigate("/"); // Redirect after successful submission
      } else {
        toast.error("Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-green-50 border border-green-300 rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">
        Organization Registration
      </h1>

      <div className="mb-6 flex flex-col items-center">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-32 h-32 rounded-full overflow-hidden bg-green-200 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
        >
          {logoPreview ? (
            <img
              src={logoPreview}
              alt="Logo Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <Upload className="w-8 h-8 text-green-600" />
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => setLogoPreview(reader.result as string);
              reader.readAsDataURL(file);
            }
          }}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="mt-2 text-sm text-green-600 hover:underline"
        >
          {logoPreview ? "Change Logo" : "Upload Logo"}
        </button>
      </div>

      <CustomForm
        fields={fields}
        onSubmit={handleSubmit}
        submitLabel="Register Organization"
        submitClass="bg-green-600 text-white hover:bg-green-700"
      />
    </div>
  );
}

export default CharityForm;
