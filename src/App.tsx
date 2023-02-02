import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAppSelector } from "./store";

function App() {
  const { isLogin } = useAppSelector((state) => state.user);

  const router = createBrowserRouter([
    { path: "/", element: isLogin ? <Dashboard /> : <Navigate to="/login" /> },
    {
      path: "/register",
      element: isLogin ? <Navigate to="/" /> : <Register />,
    },
    { path: "/login", element: isLogin ? <Navigate to="/" /> : <Login /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
