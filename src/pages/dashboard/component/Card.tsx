// components/common/Card.tsx
import React from 'react';

interface CardProps {
  label: string;
  value?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  label,
  value,
  icon,
  onClick,
  className,
  children,
}) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center ${className}`}
    >
      <div className="text-2xl font-semibold">{label}</div>
      {icon && <div className="text-2xl mt-2">{icon}</div>}
      {value && <div className="text-xl mt-2">{value}</div>}
      {children}
    </div>
  );
};
