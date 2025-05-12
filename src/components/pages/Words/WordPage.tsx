import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";

import { MainLayout } from "../../shared/Layouts/MainLayout";
import { Loading } from "./Loading";
import { ErrorMessage } from "./ErrorMessage";
import { WordTable } from "./WordTable";
import Input from "../../ui/Input";
import { Word } from "../../../models/Word";
import { debounce } from "../../../utils/debounce";
import { useWordStore } from "../../../store/useWordStore";
import { wordService } from "../../../services/wordService";

export const WordPage = () => {
  const {
    words,
    loading,
    errors,
    currentPage: page,
    totalPages,
    total,
    setPage,
    setSearchQuery,
    retry,
    updateWord,
    deleteWord,
  } = useWordStore();

  const [isGenerating, setIsGenerating] = useState<boolean>(false);

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
      const { _id, ...rest } = word;
      await updateWord(_id, rest);
      toast.success("Word updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error updating word.");
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await deleteWord(id);
      toast.success("Word removed successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting word.");
    }
  };

  const handleGenerateWord = async () => {
    if (!searchQuery) return;

    setIsGenerating(true);
    try {
      await wordService.generateWordJSON(searchQuery, "en");
      toast.success("Word generated successfully!");
      // Refresh the word list to show the new word
      retry();
    } catch (error) {
      console.error(error);
      toast.error("Error generating word.");
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredWords = words.filter((word) =>
    word.word.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="text-customGreen-100 p-6 h-auto">
        {errors && <ErrorMessage retry={retry} />}
        <div className="flex justify-between items-center w-full pb-4">
          <Input
            name="searchQuery"
            control={control}
            placeholder={`Search in ${total} words...`}
          />
        </div>
        {loading ? (
          <Loading />
        ) : filteredWords.length === 0 && searchQuery ? (
          <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
            <p className="text-green-300 text-center text-xl">
              No word found for "{searchQuery}"
            </p>
            <button
              onClick={handleGenerateWord}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-800 text-white rounded-md font-medium"
            >
              {isGenerating ? (
                <Loader className="animate-spin w-5 h-5" />
              ) : null}
              {isGenerating ? "Generating..." : "Generate Word with AI"}
            </button>
          </div>
        ) : (
          <WordTable
            words={filteredWords}
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
