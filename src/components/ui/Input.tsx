import React from "react";
import { useController, Control } from "react-hook-form";
import { Search } from "lucide-react"; 

interface InputProps {
  name: string;
  control: Control<any>;
  placeholder?: string;
  icon?: React.ReactNode; // Property for custom icon
  rounded?: string; // Class for rounded corners
  rules?: any; // Validation rules for react-hook-form
  type?: string; // Input type, default is "text"
  disabled?: boolean; // Disabled input
  className?: string; // Custom class
}

const Input: React.FC<InputProps> = ({
  name,
  control,
  className,
  placeholder = "Search...",
  icon = <Search className="w-5 h-5 text-green-700" />, // Default icon
  rounded = "rounded-md", // Default class for rounded corners
  rules,
  type = "text", // Default input type
  disabled = false, // Default disabled state is false
}) => {
  const {
    field: { value, onChange, onBlur },
  } = useController({
    name,
    control,
    rules,
    defaultValue: "",
  });

  return (
    <div className={`relative flex-grow ${className}`}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full bg-customBlack-200 placeholder-gray-500 py-2 pl-10 pr-4 ${rounded} focus:outline-none
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      />
      {/* Icon positioned on the left side of the input */}
      <span className={`absolute left-3 top-1/2 transform -translate-y-1/2 
        ${disabled ? "text-gray-400" : ""}`}>
        {icon}
      </span>
    </div>
  );
};

export default Input;
