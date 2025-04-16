import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronLeft,
  Timer,
  BookOpen,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import { useCustomMarkdownRenderer } from "./procesatorMarkdown";
import { BACKURL } from "../../../api/backConf";
import { SidePanelModalWord } from "./SidePanelModalWord";
import { Lecture } from "../../../models/Lecture";

// LecturaPage.tsx (actualizado)

export const LecturaPage = () => {
  const [lecture, setLecture] = useState<Lecture>();
  // const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const { customComponents, wordSelected } = useCustomMarkdownRenderer();

  const { id } = useParams<{ id: string }>();

  const getLecture = async () => {
    try {
      const response = await fetch(`${BACKURL}/api/lectures/${id}`);
      const data: Lecture = await response.json();
      setLecture(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLecture();
  }, []);

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
            <span>{lecture?.time} min</span>
          </span>
          <span
            className="border py-1 rounded-xl px-2 text-xs cursor-pointer text-green-600"
            title="Level A1"
          >
            Level: <strong> {lecture?.level}</strong>
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
              lecture?.img
                ? lecture?.img
                : "https://avatars.githubusercontent.com/u/6078720?s=200&v=4"
            }
            alt="NPM Logo"
            className="w-48 h-48 object-cover float-left mr-4 mb-2 rounded-lg"
          />
          <div>
            <ReactMarkdown
              // @ts-ignore
              components={customComponents}
              rehypePlugins={[rehypeRaw]}
            >
              {lecture?.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Barra de progreso */}
      {/* <div className="mb-4">
        <div className="h-1 w-full bg-gray-700 rounded-full">
          <div className="h-1 bg-gray-500 rounded-full"></div>
        </div>
      </div> */}

      {/* Controles de reproducción */}
      {/* <div className="flex justify-center items-center space-x-4">
        <button className={`p-2 opacity-50 cursor-not-allowed`}>
          <SkipBack className="w-6 h-6" />
        </button>
        <button
          className="p-2 bg-green-800 rounded-full"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-black" />
          ) : (
            <Play className="w-6 h-6 text-black" />
          )}
        </button>
        <button className={`p-2`}>
          <SkipForward className="w-6 h-6" />
        </button>
      </div> */}

      {/* Panel lateral */}
      <SidePanelModalWord
        isVisible={isSidePanelOpen}
        wordSelected={wordSelected}
        onClose={() => setIsSidePanelOpen(false)}
      />
    </div>
  );
};
