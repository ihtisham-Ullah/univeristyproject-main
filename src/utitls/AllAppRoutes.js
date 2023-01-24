//private routes
import Register from "../components/Auth/registerSalesperson/RegisterSalesperson";
import ViewSalesperson from "../components/Auth/viewSalesperson/ViewSalesperson";
import CreateTask from "../components/ManageTask/CreateTask/CreateTask";
import ViewTasks from "../components/ManageTask/ViewTasks/ViewTasks";
import { Dashboard } from "../components/Auth/dashboard/Dashboard";
import Notification from "../components/notification/Notification";
export const allPrivateAppRoutes = [
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
];
