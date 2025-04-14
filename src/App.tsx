import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./Loader";


const SignInPage = lazy(() => import("./Components/Authentication/SignIn"));
const DashboardPage = lazy(() => import("./Pages/createMasterData/Dashboard"));
const MasterData = lazy(() => import("./Pages/createMasterData/MasterData"));
const CreateMasterData = lazy(() => import("./Pages/createMasterData/CreateMasterData"));
const Layout = lazy(() => import("./Components/ReUsable/LayOut"));
const ProtectedRoute = lazy(() => import("./Components/Authentication/ProtectedRoute"));
const NotFoundPage = lazy(() => import("./Components/Authentication/NotFoundPage"));
const ViewMasterData = lazy(()=>import("./Pages/viewMasterData/ViewMasterData"));
const DailyPlan = lazy(()=>import("./Pages/DailyPlan"));
const JobsList = lazy(()=>import("./Pages/viewMasterData/JobsList"));
const CreatePlan = lazy(()=>import("./Pages/DailyPlan/createPlan"));
const ViewDailyPlan = lazy(()=>import("./Pages/DailyPlan/viewDailyPlan"));


const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/masterData" element={<MasterData />} />
              <Route path="/createMasterData" element={<CreateMasterData />} />
              <Route path="/updateMasterData/:id" element={<CreateMasterData />} />
              <Route path="/viewMasterData/:id" element={<ViewMasterData/>}/>
              <Route path="/dailyPlan" element={<DailyPlan/>} />
              <Route path="/viewJobsList" element={<JobsList/>}/>
              <Route path="/createPlan" element={<CreatePlan/>}/>
              <Route path="/viewDailyPlan" element={<ViewDailyPlan/>}/>         
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
