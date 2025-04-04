import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInPage from "./Components/Authentication/SignIn";
import DashboardPage from "./Pages/Dashboard";
import Layout from "./Components/ReUsable/LayOut";
import ProtectedRoute from "./Components/Authentication/ProtectedRoute";
import MasterData from "./Pages/MasterData";
import NotFoundPage from "./Components/Authentication/NotFoundPage";
import CreateMasterData from "./Pages/CreateMasterData";

const App: React.FC = () => {
  return (
<Router>
  <Routes>
    <Route path="/" element={<SignInPage />} />
    <Route element={<ProtectedRoute />}>
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/masterData" element={<MasterData />} />
        <Route path="/createMasterData" element={<CreateMasterData />} />
      </Route>
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
</Router>
  );
};

export default App;
