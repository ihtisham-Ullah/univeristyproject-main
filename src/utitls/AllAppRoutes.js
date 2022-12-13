//private routes
import Register from "../components/Auth/registerSalesperson/RegisterSalesperson";
import ViewSalesperson from "../components/Auth/viewSalesperson/ViewSalesperson";
export const allPrivateAppRoutes = [
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "/Salesperson",
    component: <ViewSalesperson/>,
  },
];


