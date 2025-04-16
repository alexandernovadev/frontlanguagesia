import {
  BookOpen,
  Home,
  User,
  Zap,
  Gamepad2,
  FileChartColumn,
} from "lucide-react";
import { Link } from "react-router-dom";

export const NabvarMain = () => {
  return (
    <nav className="navbarNova fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[1024px] flex justify-around py-4 bg-customBlack-200 rounded-2xl">
      <Link to="/" className="rounded-lg p-1">
        <Home className="text-green-700 w-6 h-6" />
      </Link>
      <Link to="/generator" className="rounded-lg p-1">
        <Zap className="w-6 h-6" />
      </Link>
      <Link to="/words" className="rounded-lg p-1">
        <BookOpen className="w-6 h-6" />
      </Link>

      <Link to="/exercises/anki" className="rounded-lg p-1">
        <Gamepad2 className="w-6 h-6" />
      </Link>
      <Link to="/statistics" className="rounded-lg p-1">
        <FileChartColumn className="w-6 h-6" />
      </Link>
      <Link to="/profile" className="rounded-lg p-1">
        <User className="w-6 h-6" />
      </Link>
    </nav>
  );
};
