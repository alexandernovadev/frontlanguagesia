import { useEffect, useState } from "react";
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
                  {loading ? "..." : data?.words.total}
                </span>
              </h2>
            </section>
            <div className="grid grid-cols-2 w-full text-white-700 text-md gap-y-1">
              <span className="text-green-500 font-semibold text-lg">Easy</span>
              <span className="font-bold text-white">
                {loading ? "..." : data?.words.easy}
              </span>
              <span className="text-blue-500 font-semibold text-lg">
                Medium
              </span>
              <span className="font-bold text-white">
                {loading ? "..." : data?.words.medium}
              </span>
              <span className="text-red-500 font-semibold text-lg">Hard</span>
              <span className="font-bold text-white">
                {loading ? "..." : data?.words.hard}
              </span>
            </div>
          </div>

          {/* Lectures Section */}
          <div className="w-72 p-4 rounded-2xl border-4 border-yellow-400 shadow-xl flex flex-col items-start bg-transparent">
            <section className="flex items-center w-full gap-4 mb-2">
              <BookOpen size={40} className="text-yellow-500" />
              <h2 className="text-3xl font-semibold text-yellow-500 bottom-[4px] relative">
                Lectures
                <span className="text-3xl mx-4">
                  {loading ? "..." : data?.lectures.total}
                </span>
              </h2>
            </section>
            <div className="w-full text-white-700 text-md space-y-1">
              <div className="flex justify-start gap-4 w-full">
                <span className="text-blue-500 font-semibold text-lg">
                  A1{" "}
                  <span className="font-bold text-white mx-2">
                    {loading ? "..." : data?.lectures.A1}
                  </span>
                </span>
                <span className="text-blue-500 font-semibold text-lg">
                  A2{" "}
                  <span className="font-bold text-white mx-2">
                    {loading ? "..." : data?.lectures.A2}
                  </span>
                </span>
              </div>
              <div className="flex justify-start gap-4 w-full">
                <span className="text-green-500 font-semibold text-lg">
                  B1{" "}
                  <span className="font-bold text-white mx-2">
                    {loading ? "..." : data?.lectures.B1}
                  </span>
                </span>
                <span className="text-green-500 font-semibold text-lg">
                  B2{" "}
                  <span className="font-bold text-white mx-2">
                    {loading ? "..." : data?.lectures.B2}
                  </span>
                </span>
              </div>
              <div className="flex justify-start gap-4 w-full">
                <span className="text-yellow-400 font-semibold text-lg">
                  C1{" "}
                  <span className="font-bold text-white mx-2">
                    {loading ? "..." : data?.lectures.C1}
                  </span>
                </span>
                <span className="text-yellow-400 font-semibold text-lg">
                  C2{" "}
                  <span className="font-bold text-white mx-2">
                    {loading ? "..." : data?.lectures.C2}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};
