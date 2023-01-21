import { Routes, Route } from "react-router-dom";
import Layout from "./common/Layout/Layout";
import LoginPage from "./components/Auth/login/Login";
import Sidebar from "../src/common/Layout/SideBar/SideBar";
import Register from "../src/components/Auth/registerSalesperson/RegisterSalesperson";
import Reset from "./components/Auth/resetPassword/reset";
import Notification from "./components/notification/Notification";
import ProtectedRoutes from "./components/protective/ProtectiveRoutes";
import Attendance from "./components/Auth/attendance/Attendance";
import Nopage from "./Nopage";
import { allPrivateAppRoutes } from "./utitls/AllAppRoutes";
import ViewSalesperson from "./components/Auth/viewSalesperson/ViewSalesperson";
import UpdateSalesperson from "./components/updateSalesperson/UpdateSalesperson";
import CreateTask from "./components/ManageTask/CreateTask/CreateTask";
import ViewTasks from "./components/ManageTask/ViewTasks/ViewTasks";

const App = () => {
  return (
    <>
      <Routes>
        {/* Original Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/Sidebar" element={<Sidebar />} />
          <Route path="/Notification" element={<Notification />} />
          <Route path="/Layout" element={Layout} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Attendance" element={<Attendance />} />
          <Route path="/Salesperson" element={<ViewSalesperson />} />
          <Route path="/UpdateSalesperson/:id" element={<UpdateSalesperson />} />
          <Route path="/CreateTask" element={<CreateTask />} />
          <Route path="/ViewTasks" element={<ViewTasks />} />
        </Route>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Reset" element={<Reset />} />
        <Route path="*" element={<Nopage />} />
      </Routes>

      <Routes>
        {allPrivateAppRoutes.map((items, index) => {
          return (
            <Route key={index} element={<Layout element={items.component} />}>
              <Route key={index} path={items.path} />
            </Route>
          );
        })}
      </Routes>
    </>
  );
};
export default App;
