import { createBrowserRouter } from "react-router-dom";
import { CreateStudent } from "./pages/CreateStudent";
import { Home } from "./pages/home";
import { UpdateStudent } from "./pages/UpdateStudent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/student/new",
    element: <CreateStudent />,
  },
  {
    path: "/student/edit/:id",
    element: <UpdateStudent />,
  },
]);