import { Routes, Route, Navigate } from "react-router-dom";
import TeamSelector from "./components/teamSelector";
import TitleScreen from "./components/titleScreen";
import MatchmakingInterface from "./components/matchmaking";
import BattleWrapper from "./components/battle/index";
import { BattleContextProvider } from "./contexts/battleContext";

const App = () => {
  return (
    <BattleContextProvider>
      <Routes>
        <Route path="/" element={<Navigate to='/title' replace/>} />
        <Route path="/title" element={<TitleScreen />} />
        <Route path="/team-selection" element={<TeamSelector />} />
        <Route path="/matchmaking" element={<MatchmakingInterface />} />
        <Route path="/battle" element={<BattleWrapper />} />
      </Routes>
    </BattleContextProvider>
  );
};

export default App;
