import React, { useCallback, useState } from "react";
import { Loader, Turtle, Volume2 } from "lucide-react";

import { Word } from "../../../../models/Word";
import { getLevelColor } from "../../../../utils/getLevelColor";
import { wordService } from "../../../../services/wordService";

export const GenerateWord = () => {
  const [loadingGetWord, setLoadingGetWord] = useState(false);
  const [wordToSearch, setWordToSearch] = useState<string | null>(null);
  const [wordDb, setWordDb] = useState<Word | undefined>(undefined);

  const generateWord = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!wordToSearch) {
      console.error("Word to search cannot be empty.");
      return;
    }
    setLoadingGetWord(true);

    try {
      // todo that "en" should be dynamic
      const data = await wordService.generateWordJSON(wordToSearch, "en");
      setWordDb(data);
    } catch (error) {
      console.error("Failed to generate word:", error);
      setWordDb(undefined);
    } finally {
      setLoadingGetWord(false);
    }
  };

  const listenWord = useCallback(
    (rate = 1) => {
      if (wordDb?.word && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(wordDb.word);
        utterance.lang = "en-US";
        utterance.rate = rate;
        window.speechSynthesis.speak(utterance);
      }
    },
    [wordDb?.word]
  );

  return (
    <form
      onSubmit={generateWord}
      className="bg-black-800 rounded-xl p-5 w-full max-w-[720px] min-h-[620px] md:min-w-[520px] md:max-h-[95vh] overflow-y-auto"
    >
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setWordToSearch(e.target.value)}
        className="p-2 border border-green-600 rounded-md w-full mb-4"
      />

      <div className="pt-2 space-y-6">
        <section className="flex flex-col md:flex-row gap-2 justify-start items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-green-400 capitalize">
            {wordToSearch || "Search for a word"}
          </h1>
        </section>

        {wordDb ? (
          <div className="flex flex-col rounded-lg gap-4">
            <div className="px-2">
              <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                <span
                  className="text-lg font-bold px-2 py-1 rounded-full border"
                  style={{
                    color: getLevelColor(wordDb.level),
                    borderColor: getLevelColor(wordDb.level),
                  }}
                >
                  {wordDb.level || "Unknown"}
                </span>
                <p className="text-yellow-500 text-base font-bold">
                  👀 {wordDb.seen}
                </p>
              </div>

              <div className="flex gap-3 mt-2 flex-wrap">
                <button
                  onClick={() => listenWord()}
                  title="Normal Speed"
                  className="border p-2 rounded-full border-green-400"
                >
                  <Volume2 size={32} color="green" />
                </button>
                <button
                  onClick={() => listenWord(0.009)}
                  title="Slow Speed"
                  className="border p-2 rounded-full border-green-400"
                >
                  <Turtle size={32} color="green" />
                </button>
              </div>

              <p className="text-2xl text-purple-500 mt-2 font-bold">
                {wordDb.IPA}
              </p>
              <p className="text-gray-400 mt-2 text-lg">{wordDb.definition}</p>

              {wordDb.spanish && (
                <div className="mt-2">
                  <p className="text-blue-500 text-2xl md:text-3xl font-bold capitalize">
                    {wordDb.spanish.word}
                  </p>
                  <p className="text-gray-300 text-base">
                    {wordDb.spanish.definition}
                  </p>
                </div>
              )}

              {wordDb.examples && wordDb.examples.length > 0 && (
                <div className="mt-2">
                  <h3 className="text-gray-400 font-bold text-base">
                    Examples
                  </h3>
                  <ul className="text-gray-300 space-y-1 mt-1 text-base">
                    {wordDb.examples.map((example, index) => (
                      <li key={index} className="list-disc list-inside">
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {wordDb.sinonyms && wordDb.sinonyms.length > 0 && (
                <div className="mt-2">
                  <h3 className="text-gray-400 font-bold text-base">
                    Synonyms
                  </h3>
                  <ul className="text-white space-y-1 mt-1 text-base capitalize">
                    {wordDb.sinonyms.map((synonym, index) => (
                      <li key={index} className="list-disc list-inside">
                        🔹 {synonym}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {wordDb.type && wordDb.type.length > 0 && (
                <div className="mt-2">
                  <h3 className="text-gray-400 font-bold text-base">
                    Word Types
                  </h3>
                  <ul className="text-white space-y-1 mt-1 text-base capitalize">
                    {wordDb.type.map((type, index) => (
                      <li key={index} className="list-disc list-inside">
                        🪹 {type}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <p className="text-green-300 text-center">
              Word not found in the database.
            </p>
            <button
              type="submit"
              disabled={loadingGetWord}
              className="flex items-center justify-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-800 text-white rounded-md font-medium"
            >
              {loadingGetWord ? (
                <Loader className="animate-spin w-5 h-5" />
              ) : null}
              {loadingGetWord ? "Generating..." : "Generate Word with AI"}
            </button>
          </div>
        )}
      </div>
    </form>
  );
};
