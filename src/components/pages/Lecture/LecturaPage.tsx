import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, Timer, BookOpen } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import { useCustomMarkdownRenderer } from "./procesatorMarkdown";
import { SidePanelModalWord } from "./SidePanelModalWord";
import { useLectureStore } from "../../../store/useLectureStore";

export const LecturaPage = () => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const { customComponents, wordSelected } = useCustomMarkdownRenderer();
  const { id } = useParams<{ id: string }>();

  const { getLectureById, activeLecture,loading } = useLectureStore();

  useEffect(() => {
    const fetchLecture = async () => {
      await getLectureById(id!);
    };
    fetchLecture();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b px-4 pt-2 pb-4 from-black-800 via-customGreen-100 to-customBlack-100 text-black-200 min-h-screen flex flex-col">
      <div className="mb-2 flex justify-between">
        <section className="flex items-center justify-center gap-3">
          <Link to="/">
            <ChevronLeft className="w-10 h-10 text-green-800" />
          </Link>
          <span
            className="text-xs bg-customGreen-50 text-green-700 px-2 py-1 rounded-full flex items-center justify-center"
            aria-label={`Duration: 3 minutes`}
          >
            <Timer className="w-4 h-4 text-green-800" />
            <span>{activeLecture?.time} min</span>
          </span>
          <span
            className="border py-1 rounded-xl px-2 text-xs cursor-pointer text-green-600"
            title="Level A1"
          >
            Level: <strong> {activeLecture?.level}</strong>
          </span>
        </section>
        <div className="flex items-center justify-center gap-3">
          {wordSelected && (
            <>
              <span className="flex rounded-lg px-2 py-1 border border-white capitalize">
                {wordSelected}
              </span>
              <BookOpen
                className="w-6 h-6 text-green-800 cursor-pointer"
                onClick={() => setIsSidePanelOpen(true)}
              />
            </>
          )}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="overflow-y-auto mb-4 px-3 rounded-lg border border-gray-700 h-[92vh]">
        <div className="clearfix">
          <img
            src={
              activeLecture?.img
                ? activeLecture?.img
                : "https://avatars.githubusercontent.com/u/6078720?s=200&v=4"
            }
            alt="NPM Logo"
            className="w-80 h-80 object-cover float-left mr-4 mb-2 rounded-lg"
          />
          <div>
            <ReactMarkdown
              // @ts-ignore
              components={customComponents}
              rehypePlugins={[rehypeRaw]}
            >
              {activeLecture?.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <div>
        <section className="bg-red-100">HOLA</section>
      </div>

      {/* Panel lateral */}
      <SidePanelModalWord
        isVisible={isSidePanelOpen}
        wordSelected={wordSelected}
        onClose={() => setIsSidePanelOpen(false)}
      />
    </div>
  );
};
