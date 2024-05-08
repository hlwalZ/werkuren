import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom"
import HomePage from "./pages/HomePage"
import NavBar from "./components/NavBar"
import AddHours from "./pages/AddHours"

function App() {



  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<NavBar/>}>
      <Route index element={<HomePage/>}/>
      <Route path="/add-hours" element={<AddHours />} />
    </Route>
  )) 

    return <RouterProvider router={router} />
  
  
}

export default App
