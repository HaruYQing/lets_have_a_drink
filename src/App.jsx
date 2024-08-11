import { Routes, Route, Outlet } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Landing from "./components/Landing";
import OwnerForm from "./components/OwnerForm";

import "./style.scss";
import "./font/NaikaiFont-Regular.ttf";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="arrange" element={<OwnerForm />} />
      </Routes>
      <Outlet />
    </BrowserRouter>
  );
}

export default App;
