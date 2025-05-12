import React, { useCallback } from "react";
import { FlipHorizontal, Turtle, Volume2 } from "lucide-react";
import { useWordStore } from "../../../../store/useWordStore";
import { getLevelColor } from "../../../../utils/getLevelColor";
import { Word } from "../../../../models/Word";

interface CardProps {
  card: Word;
  flipped: boolean;
  onFlip: () => void;
}

export const Card: React.FC<CardProps> = ({ card, flipped, onFlip }) => {
  const { updateWordLevel, setActiveWord, actionLoading } = useWordStore();

  const listenWord = useCallback(
    (rate = 1) => {
      if (card?.word && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(card.word);
        utterance.lang = "en-US";
        utterance.rate = rate;
        window.speechSynthesis.speak(utterance);
      }
    },
    [card?.word]
  );

  const handleLevelUpdate = (level: string) => {
    if (card?._id) {
      updateWordLevel(card._id, level);
    }
  };

  const handleFlip = () => {
    if (!flipped && card?._id) {
      setActiveWord(card);
    }
    onFlip();
  };

  if (!card) {
    return (
      <div className="w-full flex items-center justify-center text-gray-400 py-8">
        No card data available
      </div>
    );
  }

  return (
    <div
      className="relative w-full flex justify-center my-6"
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative w-full max-w-xl bg-gray-900 dark:bg-zinc-900 border border-green-800 rounded-2xl shadow-2xl px-4 sm:px-8 py-8 transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Flip Button */}
        <button
          onClick={handleFlip}
          className="absolute top-4 left-4 px-4 py-2 flex gap-2 bg-green-700 text-white rounded-lg shadow-md hover:bg-green-800 z-30 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          aria-label="Flip card"
        >
          <FlipHorizontal size={20} />
          <span className="font-bold text-gray-300">Flip</span>
        </button>

        {/* Card Content */}
        <div className="flex flex-col min-h-[320px]">
          {/* Front Side */}
          <div
            className={`flex-1 flex flex-col items-center justify-center text-center transition-opacity duration-300 ${flipped ? 'opacity-0 pointer-events-none absolute inset-0' : 'opacity-100 relative'}`}
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="flex items-center justify-between w-full mb-4">
              <h2 className="text-3xl sm:text-4xl font-bold capitalize text-green-600">
                {card.word}
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={() => listenWord()}
                  title="Normal Speed"
                  className="border p-2 rounded-full border-green-400 hover:bg-green-400/10 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Listen at normal speed"
                >
                  <Volume2 size={24} />
                </button>
                <button
                  onClick={() => listenWord(0.009)}
                  title="Slow Speed"
                  className="border p-2 rounded-full border-green-400 hover:bg-green-400/10 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Listen at slow speed"
                >
                  <Turtle size={24} />
                </button>
              </div>
            </div>
            <p className="text-xl sm:text-2xl text-purple-500 mb-2 font-bold">{card.IPA}</p>
            {card.img && (
              <img
                src={card.img}
                alt={card.word}
                className="w-full h-auto max-h-[240px] object-cover rounded-lg mb-2"
                loading="lazy"
              />
            )}
          </div>

          {/* Back Side */}
          <div
            className={`flex-1 flex flex-col justify-between transition-opacity duration-300 ${flipped ? 'opacity-100 relative' : 'opacity-0 pointer-events-none absolute inset-0'}`}
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="mb-4">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold capitalize text-green-600">
                  {card.word}
                </h2>
                <div className="flex items-center gap-2">
                  <span
                    className="text-lg font-bold px-2 py-1 rounded-full border"
                    style={{
                      color: getLevelColor(card.level),
                      borderColor: getLevelColor(card.level),
                    }}
                  >
                    {card.level || "Unknown"}
                  </span>
                  <p className="text-yellow-500 text-base font-bold">
                    👀 {card.seen}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 mb-2">
                <button
                  onClick={() => listenWord()}
                  title="Normal Speed"
                  className="border p-2 rounded-full border-green-400 hover:bg-green-400/10 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Listen at normal speed"
                >
                  <Volume2 size={24} />
                </button>
                <button
                  onClick={() => listenWord(0.009)}
                  title="Slow Speed"
                  className="border p-2 rounded-full border-green-400 hover:bg-green-400/10 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Listen at slow speed"
                >
                  <Turtle size={24} />
                </button>
              </div>
              <p className="text-xl sm:text-2xl text-purple-500 mb-2 font-bold">
                {card.IPA}
              </p>
              <p className="text-gray-400 mb-2 text-base sm:text-lg">{card.definition}</p>
              {card.spanish && (
                <div className="mb-2">
                  <p className="text-blue-800 text-lg sm:text-xl font-bold capitalize">
                    {card.spanish.word}
                  </p>
                  <p className="text-gray-300 text-base">
                    {card.spanish.definition}
                  </p>
                </div>
              )}
              {card.examples && card.examples.length > 0 && (
                <div className="mb-2">
                  <h3 className="text-gray-400 font-bold text-base">Examples</h3>
                  <ul className="text-gray-300 space-y-1 mt-1 text-base">
                    {card.examples.map((example, index) => (
                      <li key={index} className="list-disc list-inside">
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {card.sinonyms && card.sinonyms.length > 0 && (
                <div className="mb-2">
                  <h3 className="text-gray-400 font-bold text-base">Synonyms</h3>
                  <ul className="text-white space-y-1 mt-1 text-base capitalize">
                    {card.sinonyms.map((synonym, index) => (
                      <li key={index} className="list-disc list-inside">
                        🔹 {synonym}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {card.type && card.type.length > 0 && (
                <div className="mb-2">
                  <h3 className="text-gray-400 font-bold text-base">
                    Word Types
                  </h3>
                  <ul className="text-white space-y-1 mt-1 text-base capitalize">
                    {card.type.map((type, index) => (
                      <li key={index} className="list-disc list-inside">
                        🪹 {type}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* Level Buttons */}
            <div className="flex justify-around mt-4 px-2 sm:px-5 gap-2">
              {["easy", "medium", "hard"].map((level) => (
                <button
                  key={level}
                  onClick={() => handleLevelUpdate(level)}
                  disabled={actionLoading.updateLevel || card.level === level}
                  className={`flex-1 py-2 rounded-lg text-gray-300 font-bold text-sm sm:text-base transition-colors shadow-md
                    ${
                      level === "easy"
                        ? "bg-green-700 hover:bg-green-800"
                        : level === "medium"
                        ? "bg-blue-700 hover:bg-blue-800"
                        : "bg-red-700 hover:bg-red-800"
                    }
                    ${
                      actionLoading.updateLevel || card.level === level
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                    ${
                      level === "easy"
                        ? "focus:ring-green-500"
                        : level === "medium"
                        ? "focus:ring-blue-500"
                        : "focus:ring-red-500"
                    }`}
                  aria-label={`Mark as ${level}`}
                  aria-disabled={actionLoading.updateLevel || card.level === level}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
