import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'danger' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  title?: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  title,
  type,
  icon: Icon,
  children,
  className = '',
}) => {
  const baseStyles = 'transition-colors font-medium flex items-center justify-center gap-2';
  
  const variantStyles = {
    primary: 'rounded-md bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-400 disabled:cursor-not-allowed',
    secondary: 'rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700',
    danger: 'rounded-md bg-red-50 hover:bg-red-100 text-red-500',
    icon: 'rounded-full hover:bg-blue-50 text-blue-500 p-2',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const styles = `${baseStyles} ${variantStyles[variant]} ${variant !== 'icon' ? sizeStyles[size] : ''} ${className}`;

  return (
    <button
      onClick={onClick}
      type={type || "button"}
      disabled={disabled}
      title={title}
      className={styles}
    >
      {Icon && <Icon className={variant === "icon" ? "w-5 h-5" : "w-4 h-4"} />}
      {children}
    </button>
  );
}; 