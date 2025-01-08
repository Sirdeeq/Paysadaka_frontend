import React from 'react';
import { Form } from '../components/common/Form';

export const Contact: React.FC = () => {
  const fields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'message', label: 'Message', type: 'textarea', required: true },
  ];

  const handleSubmit = (data: unknown) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-emerald-50">
      <h1 className="text-4xl font-bold mb-8 text-emerald-600">Contact Us</h1>
      <div className="max-w-2xl mx-auto">
        <Form
          fields={fields}
          onSubmit={handleSubmit}
          submitLabel="Send Message"
        />
      </div>
    </div>
  );
};