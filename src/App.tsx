import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInPage from "./Components/Authentication/SignIn";
import DashboardPage from "./Pages/Dashboard";
import Layout from "./Components/ReUsable/LayOut";
import ProtectedRoute from "./Components/Authentication/ProtectedRoute";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
