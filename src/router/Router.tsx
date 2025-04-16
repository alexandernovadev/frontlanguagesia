import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "../components/pages/Home/HomePage";
import { WordPage } from "../components/pages/Words/WordPage";
import { GeneratorPage } from "../components/pages/Generator/GeneratorPage";
import { LecturaPage } from "../components/pages/Lecture/LecturaPage";
import { Statistics } from "../components/pages/Statistics/Statistics";
import { ProfilePage } from "../components/pages/Profile/ProfilePage";
import { AnkiGamePage } from "../components/pages/Exercices/AnkiGame/AnkiGamePage";
import { IrregularVerbsGame } from "../components/pages/Exercices/IrregularVerbs/IrregularVerbsGame";
import { ExercisesLayout } from "../components/pages/Exercices/ExercisesLayout";

const RouterP = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/words" element={<WordPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/generator" element={<GeneratorPage />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/lecture/:id" element={<LecturaPage />} />

        <Route path="/exercises" element={<ExercisesLayout />}>
          <Route path="anki" element={<AnkiGamePage />} />
          <Route path="irregular-verbs" element={<IrregularVerbsGame />} />
        </Route>

        <Route path="*" element={<Navigate to="/?sequo vs=true" replace />} />
      </Routes>
    </Router>
  );
};

export default RouterP;
