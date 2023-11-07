import "./App.css";
import Login from "./components/login/login";
import Homepage from "./components/homepage/homepage";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import ErrorPage from "./error_page";
import { AuthProtectedRoutes, useAuth } from "./context/AuthContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Login />}  />
      <Route path="/home" element={<Homepage />} ErrorBoundary={<ErrorPage/>} />
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
