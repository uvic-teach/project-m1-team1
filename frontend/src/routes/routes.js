import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { ProtectedRoute } from "./protectedRoute";
import Homepage from "../components/homepage/homepage";
import Login from "../components/login/login";
import Triage from "../components/triage/triage";
import WaitList from "../components/waitlist/waitlist";
import Registration from "../components/registration/registration";
import DoctorTriage from "../components/triage/doctorTriage";
import DoctorWaitlist from "../components/waitlist/doctorWaitlist";
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
          element: <Triage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: '/doctorTriage',
          element: <DoctorTriage/>
        },
        {
          path: '/doctorWaitlist',
          element: <DoctorWaitlist/>
        }
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Registration />,
    }
  ];

  const router = createBrowserRouter([
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
