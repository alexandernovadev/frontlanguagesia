import { useState } from "react";
import { Link } from "react-router-dom";
import { Edit2, Eye, Trash2 } from "lucide-react";

import { Card as CardType } from "./types/types";
import { Modal } from "../../shared/Modal";
import { FormLecture } from "./FormLecture";
import { getTitleFromMD } from "../../../utils/getTitleFromMD";
import { useLectureStore } from "../../../store/useLectureStore";

interface CardProps {
  card: CardType;
}

export const Card = ({ card }: CardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { deleteLecture, actionLoading } = useLectureStore();

  const handleDelete = async () => {
    await deleteLecture(card._id!);
    setIsDeleteModalOpen(false);
  };

  return (
    <div
      role="article"
      aria-labelledby={`card-title-${card._id}`}
      tabIndex={0}
      className="flex flex-col border border-gray-600 rounded-lg focus:outline-none focus:ring-[0.3px] focus:ring-green-600 focus:border-green-600 cursor-pointer bg-gray-800" // Dark theme background
    >
      <div
        className="bg-customBlack-200 rounded-lg p-4 aspect-square relative bg-center bg-cover opacity-90"
        style={{
          backgroundImage: `url(${card.img})`,
        }}
      >
        <div
          className="absolute top-2 left-2 text-2xl flex gap-4 items-center"
          role="img"
          aria-label={`Flag representing ${card.flag}`}
        >
          <span>{card.language === "en" ? "🇬🇧" : ""}</span>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="bg-gray-700 p-2 rounded-full hover:bg-gray-600"
          >
            <Edit2 className="w-4 h-4 text-green-500" />
          </button>

          <Link
            className="bg-gray-700 p-2 rounded-full hover:bg-gray-600"
            to={`/lecture/${card._id}`}
            key={card._id}
          >
            <Eye className="w-4 h-4 text-green-500" />
          </Link>

          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="bg-red-800 p-2 rounded-full hover:bg-red-700"
            aria-label={`Delete lecture ${getTitleFromMD(card.content)}`}
          >
            <Trash2 className="w-4 h-4 text-white" />
          </button>
        </div>
        <div className="absolute bottom-2 right-2 flex flex-col space-y-1">
          <span
            className="text-xs bg-gray-700 text-green-500 w-[29px] rounded-full px-2 py-1 relative left-[35px]"
            aria-label={`Level: ${card.level}`}
          >
            {card.level}
          </span>

          <span
            className="text-xs bg-gray-900 text-green-500 px-2 py-1 rounded-full flex items-center"
            aria-label={`Duration: ${card.time} minutes`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {card.time} min
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-2 px-2 py-2">
        <p
          id={`card-title-${card._id}`}
          title={getTitleFromMD(card.content)}
          className="text-sm font-medium text-gray-200 line-clamp-2"
        >
          {getTitleFromMD(card.content)}
        </p>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <FormLecture lecture={card} onClose={() => setIsEditModalOpen(false)} />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <div className="bg-gray-800 text-gray-200 p-6 rounded-lg max-w-96">
          <h2 className="text-lg font-semibold mb-4">
            Are you sure you want to delete "{getTitleFromMD(card.content)}"?
          </h2>
          <p className="mb-6 text-sm">This action cannot be undone.</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={actionLoading.delete}
              className={`bg-red-600 text-white px-4 py-2 rounded hover:bg-red-600 ${
                actionLoading.delete ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {actionLoading.delete ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
