import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import LoadingSpinner from "../components/shared/LoadingSpinner";

// Lazy load components
const LoginPage = lazy(() => import("../components/pages/Login/LoginPage"));
const HomePage = lazy(() => import("../components/pages/Home/HomePage"));
const GeneratorPage = lazy(() => import("../components/pages/Generator/GeneratorPage").then(module => ({ default: module.GeneratorPage })));
const LecturaPage = lazy(() => import("../components/pages/Lecture/LecturaPage").then(module => ({ default: module.LecturaPage })));
const Statistics = lazy(() => import("../components/pages/Statistics/Statistics").then(module => ({ default: module.Statistics })));
const ProfilePage = lazy(() => import("../components/pages/Profile/ProfilePage").then(module => ({ default: module.ProfilePage })));
const AnkiGamePage = lazy(() => import("../components/pages/Exercices/AnkiGame/AnkiGamePage").then(module => ({ default: module.AnkiGamePage })));
const IrregularVerbsGame = lazy(() => import("../components/pages/Exercices/IrregularVerbs/IrregularVerbsGame").then(module => ({ default: module.IrregularVerbsGame })));
const ExercisesLayout = lazy(() => import("../components/pages/Exercices/ExercisesLayout").then(module => ({ default: module.ExercisesLayout })));
const WordPage = lazy(() => import("../components/pages/Words/WordPage").then(module => ({ default: module.WordPage })));

const RouterP = () => {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
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
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default RouterP;
