import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle, X } from "lucide-react";

import verbs from "./tabla.json";
import { MainLayout } from "../../../shared/Layouts/MainLayout";
import { shuffleArray } from "../../../../utils/shuffledArray";

type Verb = {
  Verb: string;
  Past: string;
  "Past Participle (PP)": string;
  Spanish: string;
};

const ITEMS_PER_PAGE = 10;
const fields: (keyof Verb)[] = ["Verb", "Past", "Past Participle (PP)"];

export const IrregularVerbsGame = () => {
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [randomFields, setRandomFields] = useState<number[]>([]);
  const [validated, setValidated] = useState<boolean>(false);
  const [shuffledVerbs, setShuffledVerbs] = useState<Verb[]>([]);

  //shuffled verbs
  useEffect(() => {
    const shuffled = shuffleArray(verbs);
    setShuffledVerbs(shuffled);
  }, []);

  // Calcular el total de páginas basado en el array mezclado
  const totalPages = Math.ceil(shuffledVerbs.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (shuffledVerbs.length === 0) return; // Esperar a que shuffledVerbs esté listo

    const initialAnswers = Array.from({ length: ITEMS_PER_PAGE }, () => [
      "",
      "",
      "",
    ]);
    setAnswers(initialAnswers);
    const randoms = Array.from({ length: ITEMS_PER_PAGE }, () =>
      Math.floor(Math.random() * 3)
    );
    setRandomFields(randoms);
    setValidated(false);
  }, [page, shuffledVerbs]);

  const handleChange = (rowIndex: number, value: string) => {
    const updatedAnswers = answers.map((answer, i) =>
      i === rowIndex
        ? answer.map((val, j) => (j === randomFields[rowIndex] ? value : val))
        : answer
    );
    setAnswers(updatedAnswers);
  };

  const validateAnswers = () => {
    setValidated(true);
  };

  const nextPage = () => setPage((prev) => Math.min(prev + 1, totalPages - 1));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 0));

  const listenWord = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  const startIndex = page * ITEMS_PER_PAGE;
  const currentVerbs: Verb[] = shuffledVerbs.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <MainLayout>
      <div className="min-h-screen text-white flex flex-col items-center">
        <h1 className="text-xl">
          Verb Game | {page + 1} / {totalPages}|
        </h1>
        <div className="w-full max-w-4xl overflow-y-auto px-4 h-[60vh] md:h-[75vh]">
          {currentVerbs.map((verb, i) => (
            <div
              key={i}
              className="mb-1 p-2 bg-gray-800 rounded-xl shadow-lg flex flex-wrap items-center"
            >
              {fields.map((field, j) => (
                <div key={j} className="w-1/2 md:w-1/4 px-2">
                  {j === randomFields[i] ? (
                    <section className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0">
                      <div className="flex flex-col justify-center items-start gap-2">
                        <input
                          type="text"
                          disabled={validated}
                          value={answers[i][j]}
                          onChange={(e) => handleChange(i, e.target.value)}
                          className={`w-full px-2  bg-gray-700 mx-1 text-white border 
                            border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                            ${
                              validated &&
                              answers[i][j].toLocaleLowerCase() !== verb[field]
                                ? "text-[12] py-0"
                                : "py-1"
                            }
                            `}
                        />
                        {validated &&
                          answers[i][j].toLocaleLowerCase() !== verb[field] && (
                            <div className="flex">
                              <div className="flex items-center border border-red-500 rounded-full p-1 mx-2">
                                <X
                                  className="text-red-500 "
                                  size={16}
                                  onClick={() => listenWord(verb[field])}
                                />
                              </div>
                              <span className="text-[14px] font-bold ml-2 text-gray-200">
                                {verb[field]}
                              </span>
                            </div>
                          )}
                      </div>
                      {validated &&
                        (answers[i][j].toLocaleLowerCase() === verb[field] ? (
                          <div className="flex items-center border border-green-500 rounded-full p-1 mx-2">
                            <Check
                              className="text-green-500 "
                              size={16}
                              onClick={() => listenWord(verb[field])}
                            />
                          </div>
                        ) : null)}
                    </section>
                  ) : (
                    <span
                      className="block text-center p-2 cursor-pointer"
                      onClick={() => listenWord(verb[field])}
                    >
                      {verb[field]}
                    </span>
                  )}
                </div>
              ))}
              <div className="w-1/2 md:w-1/4 px-2">
                <span className="block text-center p-2 font-bold capitalize">
                  {verb["Spanish"]}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-6 w-full max-w-4xl">
          <button
            onClick={prevPage}
            disabled={page === 0}
            className="px-4 py-2 bg-green-600 rounded-full disabled:bg-gray-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={validateAnswers}
            className="px-4 py-2 bg-green-900 rounded-md flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Validate
          </button>
          <button
            onClick={nextPage}
            disabled={page === totalPages - 1}
            className="px-4 py-2 bg-green-600 rounded-full disabled:bg-gray-700"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </MainLayout>
  );
};
