import React, { useEffect, useState } from "react";
import { CircleX, Loader, Volume2 } from "lucide-react";

import { BACKURL } from "../../../api/backConf";
import { Word } from "../../../models/Word";

interface SidePanelProps {
  isVisible: boolean;
  wordSelected: string | null;
  onClose: () => void;
}

export const SidePanelModalWord: React.FC<SidePanelProps> = ({
  isVisible,
  wordSelected,
  onClose,
}) => {
  const [wordDb, setWordDb] = useState<Word | undefined>(undefined);

  const [loadingGetWord, setLoadingGetWord] = useState(false);

  const getWord = async (word: string) => {
    try {
      const response = await fetch(`${BACKURL}/api/words/word/${word}`);
      const { data } = await response.json();
      setWordDb(data);
    } catch (error) {
      console.error(error);
    }
  };

  const generateWord = async () => {
    setLoadingGetWord(true);
    try {
      const response = await fetch(`${BACKURL}/api/ai/generate-wordJson`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: wordSelected, language: "en" }),
      });
      const { data } = await response.json();
      setWordDb(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingGetWord(false);
    }
  };

  useEffect(() => {
    const closeSidePanel = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", closeSidePanel);
    return () => {
      window.removeEventListener("keydown", closeSidePanel);
    };
  }, [onClose]);

  useEffect(() => {
    if (isVisible && wordSelected) {
      getWord(wordSelected);
    }
  }, [isVisible, wordSelected]);

  const handlePanelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Function to listen to the word pronunciation
  const listenWord = () => {
    if (wordDb?.word) {
      const utterance = new SpeechSynthesisUtterance(wordDb.word);
      utterance.lang = "en-US"; // Set language to English
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <section
      className={`fixed inset-0 bg-black bg-opacity-70 transition-opacity ${
        isVisible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={onClose}
    >
      <div
        onClick={handlePanelClick}
        className={`fixed top-0 right-0 h-full w-[420px] max-w-md bg-gray-900
          border border-green-700 rounded-l-xl
          text-gray-200 shadow-lg transition-transform duration-300 ${
            isVisible ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-green-300"
          onClick={onClose}
        >
          <CircleX className="h-6 w-6" />
        </button>

        <div className="p-6 pt-10 space-y-6 overflow-auto h-full">
          <section className="flex gap-3 justify-start items-center">
            <h1 className="text-4xl font-bold text-green-400 capitalize">
              {wordSelected}
            </h1>
            {wordDb && (
              <span onClick={listenWord} className="cursor-pointer pt-2">
                <Volume2 className="w-8 h-8" />
              </span>
            )}
          </section>

          {wordDb?.IPA && (
            <div className="flex gap-3">
              <span className="text-green-300 font-semibold text-2xl">
                {wordDb.IPA}
              </span>
            </div>
          )}

          {wordDb ? (
            <div className="space-y-6">
              <section className="flex gap-3 justify-start items-center">
                <p className="text-sm font-medium text-green-300">
                  {wordDb.level ? `Level: ${wordDb.level}` : ""}
                </p>

                {wordDb.type && (
                  <p className="text-green-200 font-medium text-sm">
                    Type: {wordDb.type.join(", ")}
                  </p>
                )}
              </section>
              <p className="text-xl font-semibold">{wordDb.definition}</p>

              {wordDb.img && (
                <img
                  src={wordDb.img}
                  alt={wordDb.word}
                  className="w-full h-48 object-cover rounded-md border border-green-700"
                />
              )}

              {wordDb.examples && (
                <div>
                  <h2 className="text-lg font-semibold text-green-400 mb-2">
                    Examples:
                  </h2>
                  <ul className="list-disc list-inside space-y-1">
                    {wordDb.examples.map((example, index) => (
                      <li key={index} className="text-black-200">
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {wordDb.codeSwitching && (
                <div>
                  <h2 className="text-lg font-semibold text-green-400 mb-2">
                    Code-Switching Examples:
                  </h2>
                  <ul className="list-disc list-inside space-y-1">
                    {wordDb.codeSwitching.map((example, index) => (
                      <li key={index} className="text-black-200">
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {wordDb.sinonyms && (
                <div>
                  <h2 className="text-lg font-semibold text-green-400 mb-2">
                    Sinonyms
                  </h2>
                  <ul className="list-disc list-inside space-y-1">
                    {wordDb.sinonyms.map((sinonym, index) => (
                      <li key={index} className="text-black-200 capitalize">
                        {sinonym}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {wordDb.spanish && (
                <div>
                  <h2 className="text-lg font-semibold text-green-400 mb-2">
                    Spanish
                  </h2>
                  <p className="text-black-200 capitalize">
                    <strong>Word</strong> {wordDb.spanish.word}
                  </p>
                  <p className="text-black-200">
                    <strong>Definición</strong> {wordDb.spanish.definition}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <p className="text-green-300 text-center">
                Word not found in the database.
              </p>
              <button
                onClick={generateWord}
                disabled={loadingGetWord}
                className="flex items-center justify-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-800 text-white rounded-md font-medium"
              >
                {loadingGetWord ? (
                  <Loader className="animate-spin w-5 h-5" /> // Spinner with animation
                ) : null}
                {loadingGetWord ? "Generating..." : "Generate Word with AI"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
