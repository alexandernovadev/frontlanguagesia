import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Modal } from "../../../shared/Modal";
import Input from "../../../ui/Input";
import Select from "../../../ui/Select";

import { Book, Eye, IdCard, Type } from "lucide-react";
import { TextAreaCustom } from "../../../ui/TextArea";
import { ArrayInput } from "./ArrayInput";
import { Word } from "../../../../models/Word";

// Opciones para los selects de nivel y tipo
const levelOptions = [
  { label: "Hard", value: "hard" },
  { label: "Medium", value: "medium" },
  { label: "Easy", value: "easy" },
];

const typeOptions = [
  { label: "Noun", value: "noun" },
  { label: "Verb", value: "verb" },
  { label: "Adjective", value: "adjective" },
  { label: "Adverb", value: "adverb" },
];

// Íconos específicos por campo
const fieldIcons = {
  _id: <IdCard className="w-5 h-5 text-green-700" />,
  IPA: <Type className="w-5 h-5 text-blue-700" />,
  word: <Book className="w-5 h-5 text-purple-700" />,
  definition: <Book className="w-5 h-5 text-yellow-700" />,
  seen: <Eye className="w-5 h-5 text-amber-700" />,
};

interface EditWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Word) => void;
  wordData: Word;
}

const EditWordModal: React.FC<EditWordModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  wordData,
}) => {
  const { control, handleSubmit, reset } = useForm<Word>({
    defaultValues: wordData,
  });

  useEffect(() => {
    reset(wordData);
  }, [wordData, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 rounded-lg shadow-lg w-full max-w-4xl bg-gray-900 max-h-[100vh] md:max-h-[80vh] overflow-y-auto md:rounded-xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div>
            <label className="text-white" htmlFor="_id">
              ID
            </label>
            <Input
              control={control}
              placeholder="ID"
              className="mt-2"
              name="_id"
              icon={fieldIcons._id}
              disabled
            />
          </div>

          <div>
            <label className="text-white" htmlFor="IPA">
              IPA
            </label>
            <Input
              control={control}
              placeholder="IPA"
              className="mt-2"
              name="IPA"
              icon={fieldIcons.IPA}
              disabled
            />
          </div>

          <div>
            <label className="text-white" htmlFor="word">
              Word
            </label>
            <Input
              control={control}
              placeholder="Word"
              className="mt-2"
              name="word"
              icon={fieldIcons.word}
            />
          </div>

          <div className="col-span-1 md:col-span-3">
            <label className="text-white" htmlFor="definition">
              Definition
            </label>
            <TextAreaCustom
              control={control}
              className="mt-2"
              placeholder="Definition"
              name="definition"
            />
          </div>

          <div className="col-span-1 md:col-span-3">
            <label className="text-white" htmlFor="examples">
              Examples
            </label>
            <ArrayInput
              control={control}
              name="examples"
              placeholder="Add an example"
            />
          </div>

          <div className="col-span-1">
            <label className="text-white mb-8" htmlFor="seen">
              Seen
            </label>
            <Input
              control={control}
              placeholder="Seen"
              className="mt-2"
              name="seen"
              type="number"
              icon={fieldIcons.seen}
            />
          </div>

          <div>
            <Select
              control={control}
              label="Level"
              name="level"
              options={levelOptions}
            />
          </div>

          <div>
            <Select
              control={control}
              label="Type"
              name="type"
              options={typeOptions}
              multiple
            />
          </div>

          <div className="col-span-1 md:col-span-3">
            <label className="text-white" htmlFor="codeSwitching">
              Code Switching
            </label>
            <ArrayInput
              control={control}
              name="codeSwitching"
              placeholder="Add a code-switching phrase"
            />
          </div>

          <div className="col-span-1 md:col-span-3">
            <label className="text-white" htmlFor="sinonyms">
              Synonyms
            </label>
            <ArrayInput
              control={control}
              name="sinonyms"
              placeholder="Add a synonym"
            />
          </div>

          <div>
            <label className="text-white" htmlFor="spanish.word">
              Spanish Word
            </label>
            <Input
              control={control}
              placeholder="Spanish Word"
              name="spanish.word"
              className="mt-2"
              icon={fieldIcons.word}
            />
          </div>

          <div className="col-span-1 md:col-span-3">
            <label className="text-white" htmlFor="spanish.definition">
              Spanish Definition
            </label>
            <TextAreaCustom
              control={control}
              placeholder="Spanish Definition"
              className="mt-2"
              name="spanish.definition"
            />
          </div>

          <div className="col-span-1 md:col-span-3">
            <label className="text-white" htmlFor="img">
              Image
            </label>
            {wordData.img && (
              <img
                className="w-32 h-32 object-cover rounded-lg mt-2"
                src={wordData.img}
                alt={wordData.word}
              />
            )}
            <Input
              control={control}
              placeholder="Here goes the image"
              className="mt-2"
              name="img"
              type="text"
              icon={fieldIcons.seen}
            />
          </div>

          <div className="col-span-1 md:col-span-3 flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditWordModal;
