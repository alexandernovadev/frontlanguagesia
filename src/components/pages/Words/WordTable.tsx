import { useState } from "react";
import { Pencil, Trash2, Volume2, Eye } from "lucide-react";

import EditWordModal from "./Form/FormWordModal";
import { Word } from "../../../models/Word";
import { getLevelColor } from "../../../utils/getLevelColor";
import { Modal } from "../../shared/Modal";
import { ViewWord } from "./ViewWord";

export const WordTable = ({
  words,
  onEdit,
  onRemove,
}: {
  words: Word[];
  onEdit: (updatedWord: Word) => void;
  onRemove: (id: string) => void;
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [activeWord, setActiveWord] = useState<Word | null>(null);

  // Function to listen to the word pronunciation
  const listenWord = (word: string) => {
    if (word) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      speechSynthesis.speak(utterance);
    }
  };

  // Function to handle opening the edit modal and setting the active word
  const handleEditClick = (word: Word) => {
    setActiveWord(word);
    setIsEditModalOpen(true);
  };

  // Function to handle opening the view modal and setting the active word
  const handleViewClick = (word: Word) => {
    setActiveWord(word);
    setIsViewModalOpen(true);
  };

  // Function to handle the submission from the modal
  const handleEditSubmit = (updatedWord: Word) => {
    onEdit(updatedWord); // Pass the updated word to the parent component
    setIsEditModalOpen(false);
    setActiveWord(null);
  };

  // Function to handle closing the modals
  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setIsViewModalOpen(false);
    setActiveWord(null);
  };

  return (
    <div className="overflow-y-auto w-full h-[70vh] customHeightApp">
      <table className="min-w-full text-gray-100 table-auto">
        <tbody>
          {words.map((word) => (
            <tr key={word._id} className="border-t border-gray-600 text-sm">
              {/* Palabra e icono de reproducción */}
              <td className="px-1">
                <div className="flex items-center justify-start gap-2">
                  <div>
                    <p className="text-3xl font-bold text-green-900">
                      {word.word}
                    </p>
                    <span className="text-blue-500 text-xl font-bold">
                      {word.IPA}
                    </span>
                  </div>

                  <button
                    className="flex justify-center items-center p-2 border border-green-400 rounded-full"
                    onClick={() => listenWord(word.word)}
                  >
                    <Volume2 className="" size={24} />
                  </button>
                </div>
              </td>

              {/* Traducción y detalles */}
              <td className="px-1 text-center">
                <p className="capitalize text-xl ">{word?.spanish.word}</p>
                <p className=" text-gray-400 text-xl ">Seen: {word.seen}</p>
              </td>

              {/* Nivel de dificultad */}
              <td className="px-1 py-1 text-center">
                <span
                  className="text-lg font-bold px-2 py-1 rounded-full border"
                  style={{
                    color: getLevelColor(word.level),
                    borderColor: getLevelColor(word.level),
                  }}
                >
                  {word.level || "Unknown"}
                </span>
              </td>

              {/* Íconos de acción */}
              <td className="px-1 py-1">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => handleViewClick(word)}
                    className="p-2 border border-green-400 rounded-full hover:bg-green-400 hover:text-black transition-colors"
                  >
                    <Eye size={20} />
                  </button>
                  <button
                    onClick={() => handleEditClick(word)}
                    className="p-2 border border-green-400 rounded-full hover:bg-green-400 hover:text-black transition-colors"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => onRemove(word._id)}
                    className="p-2 border border-red-400 rounded-full hover:bg-red-400 hover:text-black transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {activeWord && (
        <EditWordModal
          isOpen={isEditModalOpen}
          onClose={handleModalClose}
          onSubmit={handleEditSubmit}
          wordData={activeWord}
        />
      )}

      {/* View Modal */}
      <Modal isOpen={isViewModalOpen} onClose={handleModalClose}>
        {activeWord && <ViewWord word={activeWord} />}
      </Modal>
    </div>
  );
};
