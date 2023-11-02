import Home from "./pages/Home";
import AddNew from "./pages/AddNew";
import Edit from "./pages/Edit";
import AddItem from "./pages/AddItem";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/add-new"} element={<AddNew />} />
      <Route path={"/add"} element={<AddItem />} />

      <Route path={"/edit/:id"} element={<Edit />} />
      <Route path={"/new"} element={<Edit />} />
    </Routes>
  );
}

export default App;
