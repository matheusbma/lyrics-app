import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './styles/main.css';

import { Login } from "./routes/Login";
import { Setlists } from "./routes/Setlists";

const router = createBrowserRouter([
  {
    path: "/",
    element: < Login />,
  },
  {
    path: "/setlists",
    element: < Setlists />,
  },
  {
    path: "/songs",
    element: <h1>Songs</h1>,
  },
]);

function App() {
  return (
      <RouterProvider router={router} />
  )
}

export default App
