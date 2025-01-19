import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Upload } from "lucide-react";
import { CustomForm, FormField } from "../ui/custom-form"; // Reusable form component
import {
  BankDetails,
  type BankDetails as BankDetailsType
} from "../ui/bank-details";
import { useNavigate } from "react-router-dom";
import { createMasjid } from "../../services/api";

export const MasjidForm: React.FC = () => {
  const [logoPreview, setLogoPreview] = useState("");
  const [bankDetails, setBankDetails] = useState<BankDetailsType>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const fields: FormField[] = [
    { name: "name", label: "Masjid Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    {
      name: "phone_number",
      label: "Phone Number",
      type: "tel",
      required: true
    },
    { name: "address", label: "Address", type: "text", required: true },
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

      if (!logoFile) {
        toast.error("Please upload a logo.");
        return;
      }

      if (!bankDetails?.account_name) {
        toast.error("Please complete the bank details.");
        return;
      }

      // Prepare FormData for submission
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone_number", data.phone_number);
      formData.append("address", data.address);
      formData.append("logo", logoFile); // Attach logo file

      // Append bank details as a stringified JSON object
      formData.append(
        "bank_details",
        JSON.stringify({
          bank_code: bankDetails.bank_code,
          bank_name: bankDetails.bank_name,
          account_number: bankDetails.account_number,
          account_name: bankDetails.account_name
        })
      );

      console.log("Submitting FormData:", formData);

      // Submit to API
      await createMasjid(formData);
      toast.success("Form submitted successfully.");
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit the form.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 mb-6 bg-emerald-50 px-6 py-6">
      <h2 className="text-emerald-600 text-2xl font-bold mb-6 text-center">
        Register New Masjid
      </h2>

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
              reader.onloadend = () => {
                setLogoPreview(reader.result as string);
              };
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
        submitLabel="Create Masjid"
        submitClass="bg-green-600 text-white hover:bg-green-700"
      />
    </div>
  );
};
