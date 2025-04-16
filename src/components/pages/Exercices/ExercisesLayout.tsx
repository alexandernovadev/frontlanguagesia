import { NavLink, Outlet } from "react-router-dom";
import { MainLayout } from "../../shared/Layouts/MainLayout";

const tabs = [
  { label: "Anki", to: "/exercises/anki" },
  { label: "Irregular Verbs", to: "/exercises/irregular-verbs" },
];

export const ExercisesLayout = () => {
  return (
    <MainLayout>
      <div className="min-h-screen w-full px-4 py-8 text-gray-900 dark:text-white">
        <div className="max-w-4xl mx-auto w-full">
          <nav className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6 justify-center">
            {tabs.map((tab) => (
              <NavLink
                key={tab.to}
                to={tab.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "bg-gray-200 text-gray-800 dark:bg-zinc-700 dark:text-white"
                } hover:bg-blue-500 hover:text-white dark:hover:bg-blue-400`
                }
              >
                {tab.label}
              </NavLink>
            ))}
          </nav>

          <div className=" rounded-xl shadow-md p-4 sm:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
