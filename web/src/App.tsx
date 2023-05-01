import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './styles/main.css';

import { Setlists } from "./Routes/Setlists";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home</h1>,
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
