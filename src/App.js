import { createMemoryRouter, RouterProvider, Navigate } from "react-router-dom";
import { io } from "socket.io-client";
import notify from './utilities/notifications';

import Entry from './pages/entry/Entry';
import Main from './pages/Main';
import Welcome from './pages/welcome/Welcome';
import Test from './pages/test/Test';

import ErrorMessage from './components/error/ErrorMessage';

const socket = io(process.env.REACT_APP_BACKEND_URL);

const router = createMemoryRouter([
  {
    path: "/",
    element: < Entry />,
  },
  {
    path: "/main",
    element: < Main />,
    children: [
      {
        path: "/main/welcome",
        element: < Welcome />,
      },
      {
        path: "/main/test",
        element: < Test socket={socket} />,
      },
    ]
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

notify.init();

const App = () => {
  return (
    <div id="LayoutWrapper">
      <RouterProvider router={router} />

      <ErrorMessage />
    </div>
  );
}

export default App;
