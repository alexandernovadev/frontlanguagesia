import { Control, useFieldArray } from "react-hook-form";
import { PlusCircle, Scroll, Trash2 } from "lucide-react";

import Input from "../../../ui/Input";

interface ArrayInputProps {
  control: Control<any>;
  name: string;
  placeholder?: string;
}

export const ArrayInput: React.FC<ArrayInputProps> = ({
  control,
  name,
  placeholder,
}) => {
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <div className="mt-2">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center space-x-2 mb-2">
          <Input
            control={control}
            name={`${name}.${index}`}
            icon={<Scroll className="text-white w-4 h-4" />}
            placeholder={placeholder}
          />
          <button type="button" onClick={() => remove(index)}>
            <Trash2 className="text-red-600 w-5 h-5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append("")}
        className="flex items-center space-x-1 text-green-500"
      >
        <PlusCircle className="w-5 h-5" />
        <span>Add</span>
      </button>
    </div>
  );
};
