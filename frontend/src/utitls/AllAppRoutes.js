//private routes
import Register from "../components/Auth/registerSalesperson/RegisterSalesperson";
import ViewSalesperson from "../components/Auth/viewSalesperson/ViewSalesperson";
import CreateTask from "../components/ManageTask/CreateTask/CreateTask";
import ViewTasks from "../components/ManageTask/ViewTasks/ViewTasks";
import Notification from "../components/notification/Notification";
import Attendance from "components/Auth/attendance/Attendance";
import ViewTasksFeedback from "../components/ManageTask/ViewTasks/ViewTasksfeedback";
import ViewAllTasks from "components/ManageTask/ViewTasks/ViewAllTasks";
import SalespersonAttendance from "../components/Auth/attendance/SalespersonAttendance";
import UploadVideo from "components/Auth/Training/UploadVideo";
import ManageTraining from "components/Auth/Training/ManageTraining";
import Complain from "components/Complain/Complain";
import Dashboard from "components/Dashboard/Dashboard";
export const allPrivateAppRoutes = [
  {
    path: "/Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "/Salesperson",
    component: <ViewSalesperson />,
  },
  {
    path: "/CreateTask",
    component: <CreateTask />,
  },
  {
    path: "/ViewTasks",
    component: <ViewTasks />,
  },
  {
    path: "/Dashboard",
    component: <Dashboard />,
  },
  {
    path: "/Notification",
    component: <Notification />,
  },
  {
    path: "/Attendance",
    component: <Attendance />,
  },
  {
    path: "/ViewTasksFeedback",
    component: <ViewTasksFeedback />,
  },
  {
    path: "/ViewAllTasks",
    component: <ViewAllTasks />,
  },
  {
    path: "/SalespersonAttendance",
    component: <SalespersonAttendance />,
  },
  {
    path: "/UploadVideo",
    component: <UploadVideo />,
  },
  {
    path: "/ManageTraining",
    component: <ManageTraining />,
  },
  {
    path: "/Complain",
    component: <Complain />,
  },
];
