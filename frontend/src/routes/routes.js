import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../context/auth_provider";
import { ProtectedRoute } from "./protectedRoutes";
import Homepage from "../components/homepage/homepage";
import Login from "../components/login/login";
import Triage from "../components/triage/triage";
import WaitList from "../components/waitlist/WaitList";
const Routes = () => {
  const { token } = useAuth();

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/waitlist",
          element: <WaitList />,
        },
        {
          path: "/triage",
          element: <Triage/>
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/login",
      element: <Login />,
    },
  ];

  const router = createBrowserRouter([
   
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;

