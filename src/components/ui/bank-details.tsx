import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./select";

export interface Bank {
  name: string;
  code: string;
}

export interface BankDetails {
  bank_code: string;
  bank_name: string;
  account_number: string;
  account_name: string;
}

interface BankDetailsProps {
  onChange: (details: BankDetails) => void;
  value?: BankDetails;
}

export function BankDetails({ onChange, value }: BankDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [accountNumber, setAccountNumber] = useState(
    value?.account_number || ""
  );
  const [accountName, setAccountName] = useState(value?.account_name || "");
  const [isResolving, setIsResolving] = useState(false);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get("https://api.paystack.co/bank", {
          headers: {
            Authorization: `Bearer pk_live_3cb69488f18d1836b9355f99c46ec9e020684770`
          }
        });
        setBanks(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch bank list");
      }
    };

    fetchBanks();
  }, []);

  const uniqueBanks = banks.filter(
    (bank, index, self) => index === self.findIndex((b) => b.code === bank.code)
  );
  const bankOptions = uniqueBanks.map((bank) => ({
    value: bank.code,
    label: bank.name
  }));

  const resolveAccountName = async () => {
    if (!selectedBank?.code || !accountNumber) {
      toast.error("Please select a bank and enter an account number");
      return;
    }

    setIsResolving(true);
    try {
      const response = await axios.get("https://api.paystack.co/bank/resolve", {
        params: {
          account_number: accountNumber,
          bank_code: selectedBank.code
        },
        headers: {
          Authorization: `Bearer sk_live_230721f8b811f7f027477d9442ac547a4f28848a`
        }
      });

      const resolvedName = response.data.data.account_name;
      setAccountName(resolvedName);
      onChange({
        bank_code: selectedBank.code,
        bank_name: selectedBank.name,
        account_number: accountNumber,
        account_name: resolvedName
      });

      toast.success("Account resolved successfully");
    } catch (error) {
      toast.error("Bank not found or invalid account number");
      setAccountName("");
    } finally {
      setIsResolving(false);
    }
  };

  useEffect(() => {
    if (accountNumber.length === 10 && selectedBank) {
      resolveAccountName();
    }
  }, [accountNumber, selectedBank]);

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 bg-background rounded-lg hover:bg-muted transition-colors"
      >
        <span className="font-medium">Bank Details</span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      {isOpen && (
        <div className="p-4 border rounded-lg space-y-4">
          <div className="space-y-2">
            <Label className="text-light-green-600">Bank Name</Label>
            <Select
              value={selectedBank?.code}
              onValueChange={(code) => {
                const bank = banks.find((b) => b.code === code);
                if (bank) {
                  setSelectedBank(bank);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a bank" />
              </SelectTrigger>
              <SelectContent>
                {uniqueBanks.map((bank) => (
                  <SelectItem key={bank.code} value={bank.code}>
                    {bank.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Account Number</Label>
            <Input
              type="text"
              value={accountNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) {
                  setAccountNumber(value);
                }
              }}
              maxLength={10}
              placeholder="Enter 10-digit account number"
            />
          </div>

          <div className="space-y-2">
            <Label>Account Name</Label>
            <Input
              type="text"
              value={accountName}
              readOnly
              className="bg-muted"
            />
          </div>

          <Button
            type="button"
            onClick={resolveAccountName}
            disabled={
              isResolving || !selectedBank || accountNumber.length !== 10
            }
            className="w-full"
          >
            {isResolving ? "Resolving..." : "Resolve Account Name"}
          </Button>
        </div>
      )}
    </div>
  );
}
