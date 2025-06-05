import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./Loader";
import './App.css'
import ScrollToTop from "./Components/ReUsable/ScrollTop";
import GlobalDialog from "./Components/ReUsable/GlobalDialog";



const SignInPage = lazy(() => import("./Components/Authentication/SignIn"));
const DashboardPage = lazy(() => import("./Pages/Dashboard/Dashboard"));
const ProductionOperatorsPage = lazy(() => import("./Pages/Production_Operators/Production_Operators"));
const ReportsPage = lazy(() => import("./Pages/Reports/Reports"));
const SettingsPage = lazy(() => import("./Pages/Settings/Settings"));
const MasterData = lazy(() => import("./Pages/Create_Master_Data/MasterData"));
const CreateMasterData = lazy(() => import("./Pages/Create_Master_Data/CreateMasterData"));
const Layout = lazy(() => import("./Components/ReUsable/LayOut"));
const ProtectedRoute = lazy(() => import("./Components/Authentication/ProtectedRoute"));
const NotFoundPage = lazy(() => import("./Components/Authentication/NotFoundPage"));
const ViewMasterData = lazy(()=>import("./Pages/View_Master_Data/ViewMasterData"));
const DailyPlan = lazy(()=>import("./Pages/DailyPlan"));
const JobsList = lazy(()=>import("./Pages/View_Master_Data/JobsList"));
const CreatePlan = lazy(()=>import("./Pages/DailyPlan/createPlan"));
const ViewDailyPlan = lazy(()=>import("./Pages/DailyPlan/View_Daily_Plan"));
const ForgotPassword = lazy(()=>import("./Components/Authentication/ForgotPassword"));


const App: React.FC = () => {
  return (
    <Router>
          <ScrollToTop />
                <GlobalDialog />
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/forgotPassword" element={<ForgotPassword/>}/>
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/kld" element={<ProductionOperatorsPage/>} />
              <Route path="/settings" element={<SettingsPage/>}/>
              <Route path="/masterData" element={<MasterData />} />
              <Route path="/createMasterData" element={<CreateMasterData />} />
              <Route path="/updateMasterData/:id" element={<CreateMasterData />} />
              <Route path="/viewMasterData/:id" element={<ViewMasterData/>}/>
              <Route path="/dailyPlan" element={<DailyPlan/>} />
              <Route path="/viewJobsList" element={<JobsList/>}/>
              <Route path="/createPlan" element={<CreatePlan/>}/>
              <Route path="/viewDailyPlan/:indentNo" element={<ViewDailyPlan/>}/>  
              <Route path ="/versionDetails" element={<ViewMasterData/>}/>       
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
