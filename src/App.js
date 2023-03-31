import { Routes, Route } from "react-router-dom";
import Layout from "./common/Layout/Layout";
import LoginPage from "./components/Auth/login/Login";
import Sidebar from "../src/common/Layout/SideBar/SideBar";
import Register from "../src/components/Auth/registerSalesperson/RegisterSalesperson";
import Reset from "./components/Auth/resetPassword/reset";
import Notification from "./components/notification/Notification";

import Attendance from "./components/Auth/attendance/Attendance";
import Nopage from "./Nopage";
import { allPrivateAppRoutes } from "./utitls/AllAppRoutes";
import ViewSalesperson from "./components/Auth/viewSalesperson/ViewSalesperson";
import UpdateSalesperson from "./components/updateSalesperson/UpdateSalesperson";
import CreateTask from "./components/ManageTask/CreateTask/CreateTask";
import ViewTasks from "./components/ManageTask/ViewTasks/ViewTasks";
import UpdateedTask2 from "./components/ManageTask/CreateTask/CreateTask";
import ViewTasksfeedback from "components/ManageTask/ViewTasks/ViewTasksfeedback";
import ProtectedRoutes from "./components/protective/ProtectiveRoutes";
import SalespersonAttendance from "./components/Auth/attendance/SalespersonAttendance";
import UploadVideo from "components/Auth/Training/UploadVideo";

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
          <Route
            path="/SalespersonAttendance"
            element={<SalespersonAttendance />}
          />
          <Route path="/Salesperson" element={<ViewSalesperson />} />
          <Route
            path="/UpdateSalesperson/:id"
            element={<UpdateSalesperson />}
          />
          <Route path="/CreateTask" element={<CreateTask />} />
          <Route path="/ViewTasks" element={<ViewTasks />} />
          <Route path="/ViewTasksFeedback" element={<ViewTasksfeedback />} />
          <Route path="/UpdateTasks/:id" element={<UpdateedTask2 />} />
          <Route path="/UploadVideo" element={<UploadVideo />} />
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
