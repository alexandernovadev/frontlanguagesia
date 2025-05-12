import { Volume2, Turtle } from "lucide-react";
import { Word } from "../../../models/Word";
import { getLevelColor } from "../../../utils/getLevelColor";

interface ViewWordProps {
  word: Word;
}

export const ViewWord = ({ word }: ViewWordProps) => {
  const listenWord = (rate = 1) => {
    if (word?.word && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.lang = "en-US";
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-black-800 rounded-xl p-5 w-full max-w-[720px] min-h-[620px] md:min-w-[520px] md:max-h-[95vh] overflow-y-auto">
      <div className="pt-2 space-y-6">
        <section className="flex flex-col md:flex-row gap-2 justify-start items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-green-400 capitalize">
            {word.word}
          </h1>
        </section>

        <div className="flex flex-col rounded-lg gap-4">
          <div className="px-2">
            <div className="flex flex-col md:flex-row justify-between items-center gap-2">
              <span
                className="text-lg font-bold px-2 py-1 rounded-full border"
                style={{
                  color: getLevelColor(word.level),
                  borderColor: getLevelColor(word.level),
                }}
              >
                {word.level || "Unknown"}
              </span>
              <p className="text-yellow-500 text-base font-bold">
                👀 {word.seen}
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
              {word.IPA}
            </p>
            <p className="text-gray-400 mt-2 text-lg">{word.definition}</p>

            {word.spanish && (
              <div className="mt-2">
                <p className="text-blue-500 text-2xl md:text-3xl font-bold capitalize">
                  {word.spanish.word}
                </p>
                <p className="text-gray-300 text-base">
                  {word.spanish.definition}
                </p>
              </div>
            )}

            {word.examples && word.examples.length > 0 && (
              <div className="mt-2">
                <h3 className="text-gray-400 font-bold text-base">
                  Examples
                </h3>
                <ul className="text-gray-300 space-y-1 mt-1 text-base">
                  {word.examples.map((example, index) => (
                    <li key={index} className="list-disc list-inside">
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {word.sinonyms && word.sinonyms.length > 0 && (
              <div className="mt-2">
                <h3 className="text-gray-400 font-bold text-base">
                  Synonyms
                </h3>
                <ul className="text-white space-y-1 mt-1 text-base capitalize">
                  {word.sinonyms.map((synonym, index) => (
                    <li key={index} className="list-disc list-inside">
                      🔹 {synonym}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {word.type && word.type.length > 0 && (
              <div className="mt-2">
                <h3 className="text-gray-400 font-bold text-base">
                  Word Types
                </h3>
                <ul className="text-white space-y-1 mt-1 text-base capitalize">
                  {word.type.map((type, index) => (
                    <li key={index} className="list-disc list-inside">
                      🪹 {type}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 