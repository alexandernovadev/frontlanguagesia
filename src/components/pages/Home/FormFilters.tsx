import { useForm, Controller } from "react-hook-form";

import { Filters } from "./types/types";
import Checkbox from "../../ui/Checkbox";

export const FormFilters = () => {
  const { control, handleSubmit } = useForm<Filters>({
    defaultValues: {
      languages: [],
      levels: [],
    },
  });

  const onSubmit = () => {
    // Aquí puedes manejar los filtros aplicados
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-customBlack-200 rounded-lg p-6 w-5/6 max-w-md border border-gray-600"
    >
      <h2 className="text-xl font-bold mb-6">Filters</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-4">Languages</h3>
        <div className="space-y-3">
          {["English", "Portugues"].map((lang) => (
            <Controller
              key={lang}
              name="languages"
              control={control}
              render={() => (
                <Checkbox
                  label={lang}
                  name={`languages.${lang}`}
                  control={control}
                />
              )}
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-4">Levels</h3>
        <div className="grid grid-cols-3 gap-4">
          {["A1", "A2", "B1", "B2", "C1", "C2"].map((level) => (
            <Controller
              key={level}
              name="levels"
              control={control}
              render={() => (
                <Checkbox
                  label={level}
                  name={`levels.${level}`}
                  control={control}
                />
              )}
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-green-900 text-white py-3 rounded-lg hover:bg-green-800 transition-colors"
      >
        Apply
      </button>
    </form>
  );
};
