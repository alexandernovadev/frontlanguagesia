import { useEffect } from "react";

import { Card } from "./Card";
import { useLectureStore } from "../../../store/useLectureStore";
import { Loading } from "../Words/Loading";

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

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse w-16 h-16 bg-gray-300 rounded-full"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
          {lectures?.map((card, i) => (
            <Card key={`${card._id}|${i}`} card={card} />
          ))}
        </div>
      )}

      {lectures.length > 0 && currentPage < totalPages && (
        <button
          onClick={loadMore}
          className={`mt-4 px-4 py-2 text-white rounded-lg flex items-center gap-2 ${
            actionLoading.get
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-700 hover:bg-green-600"
          }`}
          disabled={actionLoading.get}
        >
          {actionLoading.get ? (
            <>
             <Loading />
            </>
          ) : (
            "Load More"
          )}
        </button>
      )}
    </div>
  );
};
