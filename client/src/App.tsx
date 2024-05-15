import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import AddHours from "./pages/AddHours";
import MainLayout from "./layouts/MainLayout";

const addHours = async (hours: any) => {
  const res = await fetch("/api/tijden", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(hours),
  });
};

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/add-hours"
          element={<AddHours addHoursSubmit={addHours} />}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
