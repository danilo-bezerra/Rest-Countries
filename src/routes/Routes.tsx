import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import Country from "../pages/Country";
import Home from "../pages/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="country/:id" element={<Country />} />
    </Route>
  )
);

export default function Routes() {
  return <RouterProvider router={router} />;
}
