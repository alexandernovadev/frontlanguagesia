import { useState, useEffect } from "react";
import { Play, Rewind, FastForward, X } from "lucide-react";

interface Transcript {
  speaker: string;
  time: string;
  text: string;
}

export default function PodcastPlayer() {
  const [activeTab, setActiveTab] = useState<"Notes" | "Transcript">(
    "Transcript"
  );
  const [currentTime, setCurrentTime] = useState(0);
  const [currentWordIndex] = useState(0);

  const transcript: Transcript[] = [
    {
      speaker: "Ethan",
      time: "00:02",
      text: "Welcome to the Real Life English podcast, where we help dedicated English learners just like you cultivate the courage, the confidence and the skills that you need to understand real-life native English, to communicate clearly with people from all around the world and to make your life an epic global adventure. Now, are you ready to go beyond the classroom and start living your English? Can I get an Aww yeah?",
    },
    {
      speaker: "Ethan",
      time: "00:33",
      text: "Hey there, this is Ethan, your Real Life fluency coach. In today's episode, myself and Justin, who co-founded Real Life English with me, share a bit of the history behind the company and why we created the Real Life app. We recommend you stick around until the end, because we have some special news to share, which is gonna help you become a confident,",
    },
  ];

  useEffect(() => {}, []);

  const renderHighlightedText = (text: string) => {
    const words = text.split(" ");
    return words.map((word, index) => (
      <span
        key={index}
        className={
          index === currentWordIndex % words.length
            ? "bg-blue-500 text-white"
            : ""
        }
      >
        {word}{" "}
      </span>
    ));
  };

  return (
    <div className="h-screen bg-gray-900 text-gray-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs opacity-50">NOW PLAYING</p>
            <h1 className="text-lg font-semibold">
              How To Live, Speak, and Master English ...
            </h1>
          </div>
          <button className="text-gray-400 hover:text-gray-200">
            <X size={24} />
          </button>
        </div>

        <div className="flex border-b border-gray-700 mb-4">
          <button
            className={`py-2 px-4 ${
              activeTab === "Notes" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("Notes")}
          >
            Notes
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "Transcript" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("Transcript")}
          >
            Transcript
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {transcript.map((entry, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="bg-yellow-500 text-yellow-900 text-xs font-medium px-2 py-0.5 rounded">
                  {entry.speaker}
                </span>
                <span className="text-gray-400 text-sm">{entry.time}</span>
              </div>
              <p className="text-sm">{renderHighlightedText(entry.text)}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="1000"
            value={currentTime}
            onChange={(e) => setCurrentTime(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>00:32</span>
            <span>23:23</span>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-4 mt-4">
          <button className="text-gray-400 hover:text-gray-200 flex flex-col items-center">
            <Rewind size={24} />
            <span className="text-xs mt-1">1x</span>
          </button>
          <button className="bg-blue-500 rounded-full p-3 text-white hover:bg-blue-600">
            <Play size={24} fill="currentColor" />
          </button>
          <button className="text-gray-400 hover:text-gray-200 flex flex-col items-center">
            <FastForward size={24} />
            <span className="text-xs mt-1">1x</span>
          </button>
        </div>
      </div>
    </div>
  );
}
