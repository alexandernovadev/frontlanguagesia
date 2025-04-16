import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { CirclePlus } from "lucide-react";
import { useForm } from "react-hook-form";

import { MainLayout } from "../../shared/Layouts/MainLayout";
import { Loading } from "./Loading";
import { ErrorMessage } from "./ErrorMessage";
import { WordTable } from "./WordTable";
import { Modal } from "../../shared/Modal";
import { GenerateWord } from "./generateWord/GenerateWord";
import Input from "../../ui/Input";
import { Word } from "../../../models/Word";
import { debounce } from "../../../utils/debounce";
import { useWordStore } from "../../../store/useWordStore";

export const WordPage = () => {
  const {
    words,
    loading,
    errors, 
    currentPage: page,
    totalPages,
    setPage,
    setSearchQuery,
    retry,
    updateWord,
    deleteWord,
  } = useWordStore();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { control, watch } = useForm({
    defaultValues: {
      searchQuery: "",
    },
  });

  const searchQuery = watch("searchQuery");

  const handleSearchDebounced = useCallback(
    debounce((query: string) => setSearchQuery(query), 500),
    []
  );

  useEffect(() => {
    handleSearchDebounced(searchQuery);
  }, [searchQuery, handleSearchDebounced]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleEdit = async (word: Word) => {
    try {
      const { _id, __v, ...rest } = word;
      await updateWord(_id, rest); // Use store’s updateWord method
      toast.success("Word updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error updating word.");
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await deleteWord(id); // Use store’s deleteWord method
      toast.success("Word removed successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting word.");
    }
  };

  return (
    <MainLayout>
      <div className="text-customGreen-100 p-6 h-auto">
        {errors && <ErrorMessage retry={retry} />}
        <div className="flex justify-between items-center w-full pb-4">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 border mx-2 border-green-600 rounded-lg text-white bg-green-600"
          >
            <CirclePlus />
          </button>

          <Input name="searchQuery" control={control} placeholder="Search..." />

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <GenerateWord />
          </Modal>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <WordTable
            words={words.filter((word) =>
              word.word.toLowerCase().includes(searchQuery.toLowerCase())
            )}
            onEdit={handleEdit}
            onRemove={handleRemove}
          />
        )}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className={`px-4 py-2 border border-green-600 rounded-lg text-white ${
              page === 1 ? "bg-gray-800 opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Previous
          </button>
          <span className="text-black-200">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className={`px-4 py-2 border border-green-600 rounded-lg text-white ${
              page === totalPages
                ? "bg-gray-800 opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </MainLayout>
  );
};
