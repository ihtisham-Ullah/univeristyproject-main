//private routes
import Register from "../components/Auth/registerSalesperson/RegisterSalesperson";
import ViewSalesperson from "../components/Auth/viewSalesperson/ViewSalesperson";
import CreateTask from "../components/ManageTask/CreateTask/CreateTask";
import ViewTasks from "../components/ManageTask/ViewTasks/ViewTasks";
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
];
