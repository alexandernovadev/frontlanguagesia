import { useState, useEffect } from "react";

import { Card } from "./Card";
import { CardNavigation } from "./CardNavigation";
import { useWordStore } from "../../../../store/useWordStore";
import { Loading } from "../../Words/Loading";

export const AnkiGamePage = () => {
  const {
    words: cards,
    loading,
    errors,
    getRecentHardOrMediumWords,
  } = useWordStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    getRecentHardOrMediumWords();
  }, [getRecentHardOrMediumWords]);

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loading />
      </div>
    );
  }

  if (errors) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-red-600 text-center px-4">
          {typeof errors === "string"
            ? errors
            : errors.getRecentHardOrMedium || "Failed to load cards."}
        </p>
      </div>
    );
  }

  return (
    <section 
      className="flex flex-col w-full justify-center items-center"
      role="region"
      aria-label="Anki game"
    >
      <div className="w-full px-4 sm:px-6">
        {cards.length > 0 ? (
          <>
            <Card
              card={cards[currentIndex]}
              flipped={flipped}
              onFlip={() => setFlipped(!flipped)}
            />
            <CardNavigation
              currentIndex={currentIndex}
              totalCards={cards.length}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          </>
        ) : (
          <div className="flex items-center justify-center min-h-[50vh]">
            <p className="text-center text-gray-400 py-8">No cards available.</p>
          </div>
        )}
      </div>
    </section>
  );
};
