import { Routes, Route } from "react-router-dom";
import Layout from "./common/Layout/Layout";
import LoginPage from "./components/Auth/login/loginComponent";
import Sidebar from "../src/common/Layout/SideBar/SideBar";
import Register from "../src/components/Auth/registerSalesperson/signup.component";
import Reset from "./components/Auth/resetPassword/reset";

// import { PrivateRoute } from "./utitls/privateRoute";
import { allPrivateAppRoutes } from "./utitls/AllAppRoutes";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Sidebar" element={<Sidebar />} />
        <Route path="/Layout" element={<Layout />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Reset" element={<Reset />} />
      </Routes>

      <Routes>
        {allPrivateAppRoutes.map((items, index) => {
          return (
            <Route element={<Layout element={items.component} />}>
              <Route key={index} path={items.path} />
            </Route>
          );
        })}
      </Routes>
    </div>
  );
};

export default App;
