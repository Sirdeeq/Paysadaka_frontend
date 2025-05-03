/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { DonationType } from "../components/donation/DonationType";
import { OrganizationList } from "../components/donation/OrganizationList";
import { DonationForm } from "../components/donation/DonationForm";
import { fetchMasjids, fetchCharities, submitDonation } from "../services/api";
import type {
  Organization,
  DonationFormData,
  DonationSubmissionData,
} from "../types/donation";
import { DonationModal } from "../components/donation/DonationModal";
// import process from 'process';

export const Donation: React.FC = () => {
  const [step, setStep] = useState<"type" | "list" | "form">("type");
  const [donationType, setDonationType] = useState<"masjid" | "charity" | null>(
    null
  );
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [reference, setReference] = useState("");
  const [pendingDonation, setPendingDonation] =
    useState<DonationSubmissionData | null>(null);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [receiptImage, setReceiptImage] = useState<File | null>(null);

  const handleUpload = (file: File) => {
    setReceiptImage(file);
  };

  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        // Fetch organizations based on the donation type
        const data =
          donationType === "masjid"
            ? await fetchMasjids()
            : await fetchCharities();

        // Filter only verified organizations
        const verifiedOrganizations = data.filter(
          (org: Organization) => org.is_verified
        );

        // Set the filtered organizations to state
        setOrganizations(verifiedOrganizations);
      } catch (error) {
        toast.error("Failed to load organizations");
      }
    };

    if (donationType) loadOrganizations();
  }, [donationType]);

  const handleTypeSelect = (type: "masjid" | "charity") => {
    setDonationType(type);
    setStep("list");
  };

  const handleOrgSelect = (org: Organization) => {
    setSelectedOrg(org);
    setStep("form");
  };

  // const handleDonation = async (formData: DonationFormData) => {
  //   if (!selectedOrg || !donationType) {
  //     toast.error("Invalid donation setup.");
  //     return;
  //   }

  //   console.log("Selected Organization:", selectedOrg);
  //   console.log("Form Data:", formData);

  //   try {
  //     const handler = window.PaystackPop.setup({
  //       key: "pk_live_3cb69488f18d1836b9355f99c46ec9e020684770",
  //       // key: 'pk_test_eb240d0c4d463a9b71988e41240e86cc654ce2dd',
  //       email: formData.email,
  //       amount: formData.amount * 100,
  //       currency: "NGN",
  //       ref: "PAY-" + Math.floor(Math.random() * 1000000000),
  //       callback: (response: { reference?: string }) => {
  //         if (!response.reference) {
  //           toast.error("Payment was not successful. No reference returned.");
  //           return;
  //         }

  //         const donationData: DonationSubmissionData = {
  //           ...formData,
  //           donation_type: donationType,
  //           net_amount: formData.amount,
  //           paystack_reference: response.reference,
  //           recipient_account_number: selectedOrg.bank_details.account_number,
  //           bank_code: selectedOrg.bank_details.bank_code,
  //           account_name: selectedOrg.bank_details.account_name,
  //           bank_name: selectedOrg.bank_details.bank_name,
  //           organization_id: selectedOrg._id,
  //         };

  //         console.log("Final donation data:", donationData);

  //         submitDonation(donationData)
  //           .then(() => {
  //             toast.success("Donation successful!");
  //             setStep("type");
  //           })
  //           .catch((error) => {
  //             console.error("Donation error:", error);
  //             toast.error("Failed to process donation.");
  //           });
  //       },
  //       onClose: () => {
  //         toast.error("Payment cancelled.");
  //       },
  //     });

  //     handler.openIframe();
  //   } catch (error) {
  //     console.error("Paystack initialization failed:", error);
  //     toast.error("Payment initialization failed. Please try again.");
  //   }
  // };

  const handleDonation = (formData: DonationFormData) => {
    if (!selectedOrg || !donationType) {
      toast.error("Invalid donation setup.");
      return;
    }

    const ref = "DON_" + Date.now();
    setReference(ref);

    const donationData: DonationSubmissionData = {
      ...formData,
      donation_type: donationType,
      net_amount: formData.amount,
      paystack_reference: ref,
      receipt: receiptImage ? receiptImage.name : "",
      recipient_account_number: selectedOrg.bank_details.account_number,
      bank_code: selectedOrg.bank_details.bank_code,
      account_name: selectedOrg.bank_details.account_name,
      bank_name: selectedOrg.bank_details.bank_name,
      organization_id: selectedOrg.id,
    };

    setPendingDonation(donationData);
    setShowModal(true);
  };

  // const confirmDonation = async () => {
  //   if (!pendingDonation || !receiptImage) return;

  //   setLoadingVerify(true);

  //   try {
  //     const formData = new FormData();
  //     Object.entries(pendingDonation).forEach(([key, value]) =>
  //       formData.append(key, String(value))
  //     );
  //     formData.append("receipt", receiptImage);

  //     // await fetch("/api/donations", {
  //     //   method: "POST",
  //     //   body: formData
  //     // });

  //     const donationData: DonationFormData = {
  //       donor_name: pendingDonation.donor_name,
  //       email: pendingDonation.email,
  //       amount: pendingDonation.amount,
  //       category: pendingDonation.category,
  //       recipient_account_number: pendingDonation.recipient_account_number,
  //       bank_code: pendingDonation.bank_code,
  //       account_name: pendingDonation.account_name,
  //       bank_name: pendingDonation.bank_name,
  //       donation_type: pendingDonation.donation_type,
  //       net_amount: pendingDonation.net_amount,
  //       paystack_reference: pendingDonation.paystack_reference,
  //       organization_id: pendingDonation.organization_id,
  //       receipt: ""
  //     };

  //     await submitDonation(donationData);

  //     toast.success("Donation submitted. Awaiting admin confirmation.");
  //     setShowModal(false);
  //     setStep("type");
  //   } catch (error) {
  //     console.error("Verification failed:", error);
  //     toast.error("Failed to submit donation.");
  //   } finally {
  //     setLoadingVerify(false);
  //   }
  // };

  // const confirmDonation = async () => {
  //   if (!pendingDonation || !receiptImage) {
  //     toast.error("Please upload a receipt image.");
  //     return;
  //   }

  //   setLoadingVerify(true);

  //   try {
  //     const formData = new FormData();
  //     Object.entries(pendingDonation).forEach(([key, value]) =>
  //       formData.append(key, String(value))
  //     );
  //     formData.append("receipt", receiptImage);

  //     const donationData: DonationFormData = {
  //       donor_name: pendingDonation.donor_name,
  //       email: pendingDonation.email,
  //       amount: pendingDonation.amount,
  //       category: pendingDonation.category,
  //       recipient_account_number: pendingDonation.recipient_account_number,
  //       bank_code: pendingDonation.bank_code,
  //       account_name: pendingDonation.account_name,
  //       bank_name: pendingDonation.bank_name,
  //       donation_type: pendingDonation.donation_type,
  //       net_amount: pendingDonation.net_amount,
  //       paystack_reference: pendingDonation.paystack_reference,
  //       organization_id: pendingDonation.organization_id,
  //       receipt: receiptImage ? receiptImage.name : "",
  //     };

  //     await submitDonation(donationData);

  //     toast.success("Donation submitted. Awaiting admin confirmation.");
  //     setShowModal(false);
  //     setStep("type");
  //   } catch (error: unknown) {
  //     console.error("Donation error:", error);
  //     const errorMessage =
  //       (error as any)?.response?.data?.message || "Failed to submit donation.";
  //     toast.error(errorMessage);
  //   } finally {
  //     setLoadingVerify(false);
  //   }
  // };

  const confirmDonation = async () => {
    if (!pendingDonation || !receiptImage) {
      toast.error("Please upload a receipt image.");
      return;
    }

    setLoadingVerify(true);

    try {
      const formData = new FormData();

      Object.entries(pendingDonation).forEach(([key, value]) =>
        formData.append(key, String(value))
      );

      formData.append("receipt", receiptImage);

      await submitDonation(formData); // ✅ Send the file using FormData!

      toast.success("Donation submitted. Awaiting admin confirmation.");
      setShowModal(false);
      setStep("type");
    } catch (error: unknown) {
      console.error("Donation error:", error);
      const errorMessage =
        (error as any)?.response?.data?.message || "Failed to submit donation.";
      toast.error(errorMessage);
    } finally {
      setLoadingVerify(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-emerald-50">
      <h1 className="text-emerald-600 text-4xl font-bold text-center mb-12">
        Make a Donation
      </h1>

      {step === "type" && <DonationType onSelect={handleTypeSelect} />}
      {step === "list" && organizations.length > 0 && (
        <OrganizationList
          organizations={organizations}
          onSelect={handleOrgSelect}
        />
      )}
      {step === "form" && selectedOrg && (
        <>
          <DonationForm organization={selectedOrg} onSubmit={handleDonation} />
          <DonationModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={confirmDonation}
            isLoading={loadingVerify}
            reference={reference}
            amount={pendingDonation?.net_amount || 0}
            onUpload={handleUpload}
          />
        </>
      )}
    </div>
  );
};
