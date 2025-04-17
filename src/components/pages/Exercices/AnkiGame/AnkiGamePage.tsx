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
      setFlipped(false); // Reset to front view
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false); // Reset to front view
    }
  };

  return (
    <section className="flex flex-col mt-12 w-full overflow-hidden justify-center items-center">
      {loading ? (
        <Loading />
      ) : errors ? (
        <p className="text-red-600">
          {typeof errors === "string"
            ? errors
            : errors.getRecentHardOrMedium || "Failed to load cards."}
        </p>
      ) : (
        <div className="mx-3 w-[65%]">
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
            <p>No cards available.</p>
          )}
        </div>
      )}
    </section>
  );
};
