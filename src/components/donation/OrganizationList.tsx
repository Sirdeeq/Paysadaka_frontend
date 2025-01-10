import React from 'react';
import type { Organization } from '../../types/donation';

interface OrganizationListProps {
  organizations: Organization[];
  onSelect: (org: Organization) => void;
}

export const OrganizationList: React.FC<OrganizationListProps> = ({
  organizations,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {organizations.map((org) => (
        <button
          key={org.id}
          onClick={() => onSelect(org)}
          className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
        >
          {/* Ensure you use org.logo.url to display the image */}
          <img
            src={org.logo.url}
            alt={org.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{org.name}</h3>
            <p className="text-gray-600">{org.address}</p>
          </div>
        </button>
      ))}
    </div>
  );
};
