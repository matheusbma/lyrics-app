import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './styles/main.css';

import { Login } from './routes/login';
import { SignUp } from './routes/signup';
import { Setlists } from './routes/setlists';

const router = createBrowserRouter([
  {
    path: "/",
    element: < Login />,
  },
  {
    path: "/signup",
    element: < SignUp />,
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
