import React from "react";

interface CardNavigationProps {
  currentIndex: number;
  totalCards: number;
  onNext: () => void;
  onPrevious: () => void;
}

export const CardNavigation: React.FC<CardNavigationProps> = ({
  currentIndex,
  totalCards,
  onNext,
  onPrevious,
}) => {
  const isPreviousDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === totalCards - 1;

  return (
    <div className="flex justify-between mt-4 w-full items-center">
      <button
        onClick={onPrevious}
        disabled={isPreviousDisabled}
        className={`px-4 py-2 border rounded-lg text-white ${
          isPreviousDisabled
            ? "border-gray-300 bg-gray-600 cursor-not-allowed opacity-50"
            : "border-green-800 hover:bg-green-900"
        }`}
      >
        Previous
      </button>
      <span className="text-green-800">
        Card {currentIndex + 1} of {totalCards}
      </span>
      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className={`px-4 py-2 border rounded-lg text-white ${
          isNextDisabled
            ? "border-gray-300 bg-gray-600 cursor-not-allowed opacity-50"
            : "border-green-800 hover:bg-green-900"
        }`}
      >
        Next
      </button>
    </div>
  );
};
