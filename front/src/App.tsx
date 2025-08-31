import { Routes, Route, Navigate } from "react-router-dom";
import TeamSelector from "./components/teamSelector";
import TitleScreen from "./components/titleScreen";
import MatchmakingInterface from "./components/matchmaking";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to='/title' replace/>} />
        <Route path="/title" element={<TitleScreen />} />
        <Route path="/team-selection" element={<TeamSelector />} />
        <Route path="/matchmaking" element={<MatchmakingInterface />} />
      </Routes>
    </>
  );
};

export default App;
