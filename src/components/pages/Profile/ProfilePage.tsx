import { MainLayout } from "../../shared/Layouts/MainLayout";
import { version } from "../../../../package.json";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export const VERSION =
  import.meta.env.VITE_VERSION || "V. March 8 2025 4:40 PM";

export const ProfilePage = () => {
  const { logout } = useContext(AuthContext);
  return (
    <MainLayout>
      <section className="px-12 py-8rounded-lg max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <img
            src="https://res.cloudinary.com/dv8wurqdp/image/upload/v1741580993/languagesai/words/qrxave2sgtgdohiuimnl.png"
            alt="Profile avatar"
            className="w-24 h-24 rounded-full border-4 border-green-600 mr-6"
          />
          <h1 className="text-2xl font-bold text-green-800">Alexander Nova</h1>
        </div>

        <hr className="border-t-2 border-gray-300 mb-6" />

        <h3 className="text-lg font-semibold text-green-700 mb-4">Settings</h3>
        <ul className="text-gray-700 space-y-2">
          <li className="hover:text-green-600 cursor-pointer">Portugues</li>
          <li className="hover:text-green-600 cursor-pointer">English</li>
          <li className="hover:text-green-600 cursor-pointer">Italian</li>
          <li className="hover:text-green-600 cursor-pointer">French</li>
        </ul>

        <h3 className="text-lg font-semibold text-green-700 mt-8 mb-2">
          Version
        </h3>
        <p className="text-lg text-gray-200">{VERSION}</p>
        <p className="text-lg text-gray-200">V pj: {version}</p>

        <button className="bg-red-400 p-2 border rounded-lg" onClick={logout}>
          LogOut
        </button>
      </section>
    </MainLayout>
  );
};
