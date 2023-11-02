import Home from "./pages/Home";
import HomeNew from "./pages/HomeNew";
import Edit from "./pages/Edit";

import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/home-new"} element={<HomeNew />} />
      <Route path={"/edit/:id"} element={<Edit />} />
      <Route path={"/new"} element={<Edit />} />
    </Routes>
  );
}

export default App;
