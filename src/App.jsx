import { Routes, Route, Outlet, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import Landing from "./components/Landing";
import OwnerForm from "./components/OwnerForm";
import EventDetail from "./components/EventDetail";

import "./style.scss";
import "./font/NaikaiFont-Regular.ttf";

function App() {
  const [eid, setEid] = useState(null);

  const handleEid = (newEid) => {
    setEid(newEid);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="arrange" element={<OwnerForm handleEid={handleEid} />} />
        <Route path="details" element={<EventDetail eid={eid} />} />
      </Routes>
      <Outlet />
    </BrowserRouter>
  );
}

export default App;
