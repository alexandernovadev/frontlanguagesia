import { useEffect, useMemo } from "react";
import { Loader } from "lucide-react";

import { Card } from "./Card";
import { useLectureStore } from "../../../store/useLectureStore";

export const CardList = () => {
  const {
    lectures,
    getLectures,
    currentPage,
    totalPages,
    loading,
    errors,
    actionLoading,
  } = useLectureStore();

  useEffect(() => {
    getLectures();
  }, []);

  // Memoize the lectures to render (add filters/sorts here if needed)
  const renderedLectures = useMemo(() => {
    return lectures;
  }, [lectures]);

  const loadMore = () => {
    if (currentPage < totalPages && !actionLoading.get) {
      getLectures(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col items-center pb-32">
      {errors.get && (
        <div className="text-red-500 mb-4">⚠️ Error: {errors.get}</div>
      )}

      {loading && currentPage === 1 ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex items-center gap-2 text-green-500">
            <Loader className="animate-spin w-8 h-8" />
            <span>Loading...</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {renderedLectures?.map((card, i) => (
            <div 
              key={`${card._id}|${i}`}
              className="animate__animated animate__fadeInUp"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Card card={card} />
            </div>
          ))}
        </div>
      )}

      {lectures.length > 0 && currentPage < totalPages && (
        <button
          onClick={loadMore}
          className={`mt-8 px-6 py-3 text-white rounded-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 ${
            actionLoading.get
              ? "bg-gray-500 cursor-not-allowed opacity-75"
              : "bg-green-700 hover:bg-green-600"
          }`}
          disabled={actionLoading.get}
        >
          <div className="flex items-center gap-2">
            {actionLoading.get && (
              <Loader className="animate-spin w-5 h-5" />
            )}
            <span>
              {actionLoading.get ? "Loading..." : "Load More"}
            </span>
          </div>
        </button>
      )}
    </div>
  );
};
