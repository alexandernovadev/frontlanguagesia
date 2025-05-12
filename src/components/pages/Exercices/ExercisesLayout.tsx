import { NavLink, Outlet } from "react-router-dom";
import { MainLayout } from "../../shared/Layouts/MainLayout";

const tabs = [
  { label: "Anki", to: "/exercises/anki" },
  { label: "Irregular Verbs", to: "/exercises/irregular-verbs" },
];

export const ExercisesLayout = () => {
  return (
    <MainLayout>
      <div className="min-h-screen w-full px-4 py-4 text-gray-900 dark:text-white">
        <div className="max-w-7xl mx-auto w-full">
          <nav 
            className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 justify-center"
            role="navigation"
            aria-label="Exercise types"
          >
            {tabs.map((tab) => (
              <NavLink
                key={tab.to}
                to={tab.to}
                className={({ isActive }) =>
                  `px-6 py-3 rounded-lg text-base font-medium transition-all
                  ${
                    isActive
                      ? "bg-green-600 text-white dark:bg-green-500"
                      : "bg-gray-200 text-gray-800 dark:bg-zinc-700 dark:text-white"
                  } 
                  hover:bg-green-500 hover:text-white dark:hover:bg-green-400
                  focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                  dark:focus:ring-offset-gray-800`
                }
              >
                {tab.label}
              </NavLink>
            ))}
          </nav>

          <main className="rounded-xl shadow-md p-4 sm:p-6 bg-gray-100 dark:bg-gray-800">
            <Outlet />
          </main>
        </div>
      </div>
    </MainLayout>
  );
};
