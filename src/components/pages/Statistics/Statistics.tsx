import React, { useEffect, useState, useMemo } from "react";
import { BarChart, BookOpen } from "lucide-react";

import { MainLayout } from "../../shared/Layouts/MainLayout";
import { StatisticsData } from "./types";
import { statisticsService } from "../../../services/statisticsService";

export const Statistics = () => {
  const [data, setData] = useState<StatisticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const { data } = await statisticsService.getStatistics();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  const processedData = useMemo(() => {
    if (!data) return null;

    return {
      lectures: {
        total: data.lectures.total,
        byLevel: Object.entries(data.lectures)
          .filter(([key]) => key !== 'total')
          .map(([level, count]) => ({
            level,
            count,
            percentage: (count / data.lectures.total) * 100
          }))
      },
      words: {
        total: data.words.total,
        byDifficulty: Object.entries(data.words)
          .filter(([key]) => key !== 'total')
          .map(([difficulty, count]) => ({
            difficulty,
            count,
            percentage: (count / data.words.total) * 100
          }))
      }
    };
  }, [data]);

  return (
    <MainLayout>
      <section className="flex flex-col w-full pb-4 gap-4">
        <h1 className="text-4xl font-extrabold mb-4 text-white-800 text-start mx-3">
          Statistics
        </h1>

        <div className="flex flex-row flex-wrap gap-3 md:justify-start md:items-start justify-center items-center">
          {/* Words Section */}
          <div className="w-72 p-4 rounded-2xl border-4 border-green-400 shadow-xl flex flex-col items-start bg-transparent">
            <section className="flex items-center w-full gap-4 mb-2">
              <BarChart size={40} className="text-green-500" />
              <h2
                className={`text-3xl font-semibold ${
                  loading ? "" : "text-green-500"
                }`}
              >
                Words
                <span
                  className={`text-3xl mx-4 ${
                    loading ? "animate-pulse h-2 rounded bg-gray-100" : ""
                  }`}
                >
                  {loading ? "..." : processedData?.words.total}
                </span>
              </h2>
            </section>
            <div className="grid grid-cols-2 w-full text-white-700 text-md gap-y-1">
              {processedData?.words.byDifficulty.map(({ difficulty, count }) => (
                <React.Fragment key={difficulty}>
                  <span className={`text-${difficulty === 'easy' ? 'green' : difficulty === 'medium' ? 'blue' : 'red'}-500 font-semibold text-lg`}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </span>
                  <span className="font-bold text-white">
                    {loading ? "..." : count}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Lectures Section */}
          <div className="w-72 p-4 rounded-2xl border-4 border-yellow-400 shadow-xl flex flex-col items-start bg-transparent">
            <section className="flex items-center w-full gap-4 mb-2">
              <BookOpen size={40} className="text-yellow-500" />
              <h2 className="text-3xl font-semibold text-yellow-500 bottom-[4px] relative">
                Lectures
                <span className="text-3xl mx-4">
                  {loading ? "..." : processedData?.lectures.total}
                </span>
              </h2>
            </section>
            <div className="w-full text-white-700 text-md space-y-1">
              {processedData?.lectures.byLevel.map(({ level, count }) => (
                <div key={level} className="flex justify-start gap-4 w-full">
                  <span className={`text-${level.startsWith('A') ? 'blue' : level.startsWith('B') ? 'green' : 'yellow'}-500 font-semibold text-lg`}>
                    {level}{" "}
                    <span className="font-bold text-white mx-2">
                      {loading ? "..." : count}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};
