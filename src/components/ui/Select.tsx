import React, { useState, useRef, useEffect } from "react";
import { useController, Control } from "react-hook-form";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps {
  label: string;
  name: string;
  control: Control<any>;
  options: Option[];
  multiple?: boolean;
  rules?: any;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  control,
  options,
  multiple = false,
  rules,
  disabled = false,
}) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    rules,
    defaultValue: multiple ? [] : "",
  });

  const [search, setSearch] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelectOption = (optionValue: string | number) => {
    if (multiple) {
      if (value.includes(optionValue)) {
        onChange(value.filter((val: any) => val !== optionValue));
      } else {
        onChange([...value, optionValue]);
      }
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
    setSearch("");
  };

  const displayValue = multiple
    ? options
        .filter((option) => value.includes(option.value))
        .map((option) => option.label)
        .join(", ")
    : options.find((option) => option.value === value)?.label || "";

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Cierra el dropdown si el clic ocurrió fuera del select
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup para remover el listener al desmontar el componente
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef]);

  return (
    <div
      ref={selectRef}
      className={`relative flex flex-col space-y-2 w-full ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`} // Aplica estilos de deshabilitado
    >
      <label className="text-white">{label}</label>

      {/* Search Box */}
      <div className="relative w-full">
        <input
          type="text"
          value={search || displayValue} // Mostrar búsqueda o el valor seleccionado
          onChange={(e) => setSearch(e.target.value)}
          placeholder={
            multiple && value.length > 0 ? displayValue : "Search..."
          }
          onFocus={() => !disabled && setIsOpen(true)} // Abre el dropdown al hacer focus si no está deshabilitado
          disabled={disabled} // Deshabilita el input
          className="w-full p-2 border rounded-md border-gray-700 bg-gray-800 text-white pr-10" // Añadimos espacio para el ícono
        />
        {/* Icono al final del input */}
        <span
          className={`absolute inset-y-0 right-2 flex items-center ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`} // Deshabilita el cursor si está deshabilitado
          onClick={() => !disabled && setIsOpen(!isOpen)} // Solo abre/cierra si no está deshabilitado
        >
          {isOpen ? (
            <ChevronUp className="text-white" />
          ) : (
            <ChevronDown className="text-white" />
          )}
        </span>
      </div>

      {/* Dropdown Options */}
      {isOpen && !disabled && ( // Solo muestra las opciones si no está deshabilitado
        <div className="absolute z-50 w-full top-[73px] mt-1 max-h-60 overflow-auto bg-gray-800 border border-gray-700 rounded-md transition-all duration-300 ease-in-out">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                onMouseDown={() => handleSelectOption(option.value)} // Usa onMouseDown en vez de onClick
                className={`cursor-pointer flex items-center p-2 transition-all duration-200 ${
                  (
                    multiple
                      ? value.includes(option.value)
                      : value === option.value
                  )
                    ? "bg-green-900 text-white"
                    : "bg-gray-800 text-white"
                } hover:bg-gray-700`}
              >
                {/* Checkbox-like behavior para selección múltiple */}
                {multiple ? (
                  <span
                    className={`w-6 h-6 min-h-6 min-w-6 rounded-md border border-gray-700 flex items-center justify-center transition-all duration-200 ${
                      value.includes(option.value)
                        ? "bg-green-900"
                        : "bg-gray-700"
                    }`}
                  >
                    {value.includes(option.value) && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 stroke-current text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </span>
                ) : (
                  <span className="w-6 h-6" />
                )}
                <span className="ml-3">{option.label}</span>
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-400">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
