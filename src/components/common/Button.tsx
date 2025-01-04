import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  icon: Icon,
  variant = 'primary',
  className = '',
}) => {
  const baseStyles = 'flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors';
  const variants = {
    primary: 'bg-emerald-600 text-white hover:bg-emerald-700',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {label}
    </button>
  );
};