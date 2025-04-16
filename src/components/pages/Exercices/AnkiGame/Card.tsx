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
      <div className="w-[95%] h-[80vh] mx-auto flex items-center justify-center text-gray-400">
        No card data available
      </div>
    );
  }

  return (
    <div
      className="relative w-[65%] h-[71vh] rounded-lg overflow-hidden mx-auto"
      style={{ perspective: "1000px" }}
    >
      {/* Flip Button */}
      <button
        onClick={handleFlip}
        className="absolute top-4 left-4 px-4 py-2 flex gap-2 bg-green-700 text-white rounded-lg shadow-md hover:bg-green-800 z-30 transition-colors"
      >
        <FlipHorizontal size={20} />
        <span className="font-bold text-gray-300">Flip</span>
      </button>

      {/* Card Container */}
      <div
        className="w-full h-full border border-green-800 rounded-lg shadow-lg transition-transform duration-500 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          position: "relative",
        }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center bg-gray-900 rounded-lg "
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex items-center justify-between w-full px-8 mt-4">
            <h2 className="text-4xl font-bold capitalize text-green-600">
              {card.word}
            </h2>
            <div className="flex gap-3">
              <button
                onClick={() => listenWord()}
                title="Normal Speed"
                className="border p-2 rounded-full border-green-400"
              >
                <Volume2 size={32} />
              </button>
              <button
                onClick={() => listenWord(0.009)}
                title="Slow Speed"
                className="border p-2 rounded-full border-green-400"
              >
                <Turtle size={32} />
              </button>
            </div>
          </div>
          <p className="text-2xl text-purple-500 mt-2 font-bold">{card.IPA}</p>
          {card.img && (
            <img
              src={card.img}
              alt={card.word}
              className="w-full h-[360px] object-cover rounded-lg mt-2"
            />
          )}
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 flex flex-col justify-between p-2 bg-black-900 rounded-lg "
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="mt-14 px-2 overflow-scroll">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold capitalize text-green-600">
                {card.word}
              </h2>

              <span
                className="text-lg font-bold px-2 py-1 rounded-full border"
                style={{
                  color: getLevelColor(card.level),
                  borderColor: getLevelColor(card.level),
                }}
              >
                {card.level || "Unknown"}
              </span>
              <p className="text-yellow-500 mt-1 text-base font-bold">
                👀 {card.seen}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => listenWord()}
                title="Normal Speed"
                className="border p-2 rounded-full border-green-400"
              >
                <Volume2 size={32} />
              </button>
              <button
                onClick={() => listenWord(0.009)}
                title="Slow Speed"
                className="border p-2 rounded-full border-green-400"
              >
                <Turtle size={32} />
              </button>
            </div>
            <p className="text-2xl text-purple-500 mt-2 font-bold">
              {card.IPA}
            </p>
            <p className="text-gray-400 mt-2 text-lg">{card.definition}</p>

            {card.spanish && (
              <div className="mt-2">
                <p className="text-blue-800 text-xl font-bold capitalize">
                  {card.spanish.word}
                </p>
                <p className="text-gray-300 text-base">
                  {card.spanish.definition}
                </p>
              </div>
            )}

            {card.examples && card.examples.length > 0 && (
              <div className="mt-2">
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
              <div className="mt-2">
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
              <div className="mt-2">
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
          <div className="flex justify-around mt-2 mb-3 px-5 gap-2">
            {["easy", "medium", "hard"].map((level) => (
              <button
                key={level}
                onClick={() => handleLevelUpdate(level)}
                disabled={actionLoading.updateLevel || card.level === level}
                className={`flex-1 py-2 rounded-lg text-gray-300 font-bold text-base transition-colors shadow-md ${
                  level === "easy"
                    ? "bg-green-700 hover:bg-green-800"
                    : level === "medium"
                    ? "bg-blue-700 hover:bg-blue-800"
                    : "bg-red-700 hover:bg-red-800"
                } ${
                  actionLoading.updateLevel || card.level === level
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
