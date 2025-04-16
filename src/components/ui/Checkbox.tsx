import React from "react";
import { useController, Control } from "react-hook-form";

interface CheckboxProps {
  label: string;
  name: string;
  control: Control<any>;
  rules?: any;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, name, control, rules }) => {
  const {
    field: { value, onChange, onBlur },
  } = useController({
    name,
    control,
    rules,
    defaultValue: false,
  });

  return (
    <label className="flex items-center space-x-3 cursor-pointer">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        onBlur={onBlur}
        className="absolute opacity-0 w-0 h-0 peer"
        aria-checked={value}
        aria-label={label}
        role="checkbox"
        tabIndex={0}
      />
      <span
        className={`w-6 h-6 min-h-6 min-w-6 rounded-md bg-gray-700 border border-gray-700 flex items-center justify-center transition-all duration-200 
        text-transparent peer-checked:bg-green-900 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-green-500`} // Estilos para el foco visible
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          role="img"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </span>
      <span className="text-white">{label}</span>
    </label>
  );
};

export default Checkbox;
