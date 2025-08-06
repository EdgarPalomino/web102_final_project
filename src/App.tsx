import { useRoutes } from "react-router";
import Home from "./Home";
import Post from "./Post";
import Create from "./Create";
import Edit from "./Edit";
import "./App.css";

const App = () => {

  const routes = useRoutes([
    {path: "/", element: <Home />},
    {path: "/post/:id", element: <Post />},
    {path: "/create-post", element: <Create />},
    {path: "/edit-post/:id", element: <Edit />}
  ]);

  return routes;

};

export default App;
