import { Routes, Route, Outlet, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import Landing from "./components/Landing";
import OwnerForm from "./components/OwnerForm";
import EventDetail from "./components/EventDetail";
import ClientForm from "./components/ClientForm";

import "./style.scss";
import "./font/NaikaiFont-Regular.ttf";
const queryClient = new QueryClient();

function App() {
  const [eid, setEid] = useState(null);

  const handleEid = (newEid) => {
    setEid(newEid);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="arrange" element={<OwnerForm handleEid={handleEid} />} />
          <Route path="details" element={<EventDetailFetcher eid={eid} />} />
          <Route path="invite/:eid" element={<ClientFromDetail eid={eid} />} />
        </Routes>
        <Outlet />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

function EventDetailFetcher({ eid }) {
  const {
    data: eventDetail,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["eventDetail", eid],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:8000/showEvent/${eid}`
      );
      return response.data;
    },
    enabled: !!eid,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <EventDetail eid={eid} eventDetail={eventDetail} />;
}

function ClientFromDetail({ eid }) {
  const {
    data: eventDetail,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["eventDetail", eid],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:8000/showEvent/${eid}`
      );
      return response.data;
    },
    enabled: !!eid,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <ClientForm eid={eid} eventDetail={eventDetail} />;
}

export default App;
