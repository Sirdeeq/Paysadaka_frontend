import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Form } from "../common/Form";
import { ChevronDown, ChevronUp, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createMasjid } from "../../services/organizations";
import { uploadFile } from "../../services/api";

interface Bank {
  name: string;
  code: string;
}

interface CloudinaryResponse {
  public_id: string;
  url: string;
}

export const MasjidForm: React.FC = () => {
  const navigate = useNavigate();
  const [isBankDetailsOpen, setIsBankDetailsOpen] = useState(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBankCode, setSelectedBankCode] = useState<string | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [isResolving, setIsResolving] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Logo file size must be less than 10MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const fields = [
    { name: "name", label: "Masjid Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    {
      name: "phone_number",
      label: "Phone Number",
      type: "tel",
      required: true
    },
    { name: "address", label: "Address", type: "text", required: true }
  ];

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get("https://api.paystack.co/bank", {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_PAYSTACK_KEY}`
          }
        });
        const uniqueBanks = response.data.data.reduce((acc, bank) => {
          if (!acc.some((b) => b.code === bank.code)) {
            acc.push(bank);
          }
          return acc;
        }, []);
        setBanks(uniqueBanks);
      } catch (error) {
        console.error("Error fetching banks:", error);
        toast.error("Failed to load bank list");
      }
    };

    fetchBanks();
  }, []);

  const resolveAccountName = async () => {
    if (!selectedBankCode || !accountNumber) {
      toast.error("Please select a bank and enter an account number");
      return;
    }

    setIsResolving(true);
    try {
      const response = await axios.get("https://api.paystack.co/bank/resolve", {
        params: {
          account_number: accountNumber,
          bank_code: selectedBankCode
        },
        headers: {
          Authorization: `Bearer sk_live_230721f8b811f7f027477d9442ac547a4f28848a`
        }
      });

      setAccountName(response.data.data.account_name);
      toast.success("Account resolved successfully");
    } catch (error) {
      console.error("Error resolving account:", error);
      toast.error("Invalid bank credentials or account number");
      setAccountName("");
    } finally {
      setIsResolving(false);
    }
  };

  const handleSubmit = async (formData: Record<string, string | number>) => {
    try {
      if (!logoPreview) {
        toast.error("Please upload a logo");
        return;
      }

      if (!selectedBankCode) {
        toast.error("Please select a bank");
        return;
      }

      if (!accountName) {
        toast.error("Please resolve the account details first");
        return;
      }

      const logoFile = fileInputRef.current?.files?.[0];
      let logoUrl = "";
      if (logoFile) {
        const logoFormData = new FormData();
        logoFormData.append("file", logoFile);
        const logoData: CloudinaryResponse = await uploadFile(logoFormData);
        logoUrl = logoData.url;
      }

      const masjidData = {
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone_number,
        address: formData.address,
        logo: logoUrl,
        bank_details: {
          bank_name:
            banks.find((bank) => bank.code === selectedBankCode)?.name || "",
          account_number: accountNumber,
          account_name: accountName,
          bank_code: selectedBankCode
        }
      };

      console.log(
        "Masjid Data Submitted:",
        JSON.stringify(masjidData, null, 2)
      );
      await createMasjid(masjidData);
      toast.success("Masjid created successfully.  Please check your email for verification.");
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to create Masjid");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 mb-6 bg-emerald-50 px-6 py-6">
      <h2 className="text-emerald-600 text-2xl font-bold mb-6 text-center">Register New Masjid</h2>
      <div className="mb-6 flex flex-col items-center">
        <div
          className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-4 flex items-center justify-center cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          {logoPreview ? (
            <img
              src={logoPreview}
              alt="Logo Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <Upload className="w-8 h-8 text-gray-400" />
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-sm text-emerald-600 hover:text-emerald-700"
        >
          {logoPreview ? "Change Logo" : "Upload Logo"}
        </button>
      </div>
      <Form
        fields={[
          ...fields,
          {
            type: "custom",
            render: () => (
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => setIsBankDetailsOpen(!isBankDetailsOpen)}
                  className="flex items-center justify-between w-full p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                >
                  <span className="font-medium">Bank Details</span>
                  {isBankDetailsOpen ? <ChevronUp /> : <ChevronDown />}
                </button>
                {isBankDetailsOpen && (
                  <div className="p-4 border rounded-lg space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bank Name
                      </label>
                      <select
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                        onChange={(e) => setSelectedBankCode(e.target.value)}
                        value={selectedBankCode || ""}
                      >
                        <option value="" disabled>
                          Select a Bank
                        </option>
                        {banks.map((bank, index) => (
                          <option
                            key={`${bank.code}-${index}`}
                            value={bank.code}
                          >
                            {bank.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Number
                      </label>
                      <input
                        type="tel"
                        value={accountNumber}
                        onChange={(e) => {
                          const input = e.target.value;
                          // Ensure only digits are allowed
                          if (/^\d*$/.test(input)) {
                            setAccountNumber(input);
                          }
                        }}
                        required
                        maxLength={10}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                      />

                      <button
                        type="button"
                        onClick={resolveAccountName}
                        className="mt-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50"
                        disabled={
                          isResolving ||
                          !selectedBankCode ||
                          accountNumber.length !== 10
                        }
                      >
                        {isResolving ? "Resolving..." : "Resolve Account Name"}
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Name
                      </label>
                      <input
                        type="text"
                        value={accountName}
                        readOnly
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 bg-gray-100"
                      />
                    </div>
                  </div>
                )}
              </div>
            )
          }
        ]}
        onSubmit={handleSubmit}
        submitLabel="Create Masjid"
      />
    </div>
  );
};
