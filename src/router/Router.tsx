import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../components/pages/Login/LoginPage";
import HomePage from "../components/pages/Home/HomePage";
import { GeneratorPage } from "../components/pages/Generator/GeneratorPage";
import { LecturaPage } from "../components/pages/Lecture/LecturaPage";
import { Statistics } from "../components/pages/Statistics/Statistics";
import { ProfilePage } from "../components/pages/Profile/ProfilePage";
import { AnkiGamePage } from "../components/pages/Exercices/AnkiGame/AnkiGamePage";
import { IrregularVerbsGame } from "../components/pages/Exercices/IrregularVerbs/IrregularVerbsGame";
import { ExercisesLayout } from "../components/pages/Exercices/ExercisesLayout";
import { WordPage } from "../components/pages/Words/WordPage";

const RouterP = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/words"
            element={
              <ProtectedRoute>
                <WordPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generator"
            element={
              <ProtectedRoute>
                <GeneratorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/statistics"
            element={
              <ProtectedRoute>
                <Statistics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lecture/:id"
            element={
              <ProtectedRoute>
                <LecturaPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exercises"
            element={
              <ProtectedRoute>
                <ExercisesLayout />
              </ProtectedRoute>
            }
          >
            <Route path="anki" element={<AnkiGamePage />} />
            <Route path="irregular-verbs" element={<IrregularVerbsGame />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default RouterP;
