import { Routes, Route, Outlet, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import axios from "axios";
import Landing from "./components/Landing";
import OwnerForm from "./components/OwnerForm";
import EventDetail from "./components/EventDetail";

import "./style.scss";
import "./font/NaikaiFont-Regular.ttf";
const queryClient = new QueryClient();

function App() {
  const [eid, setEid] = useState(null);
  // const [eventDetail, setEventDetail] = useState(null);

  const handleEid = (newEid) => {
    setEid(newEid);
  };

  // const {
  //   data: eventDetail,
  //   error,
  //   isLoading,
  // } = useQuery(
  //   ["eventDetail", eid],
  //   async () => {
  //     const response = await axios.get(
  //       `http://localhost:8000/showEvent/${eid}`
  //     );
  //     return response.data;
  //   },
  //   { enabled: !!eid }
  // );

  // useEffect(() => {
  //   const fetchEventDetail = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8000/showEvent/${eid}`
  //       );
  //       setEventDetail(response.data);
  //     } catch (error) {
  //       console.error("Error fetching event detail:", error);
  //     }
  //   };

  //   fetchEventDetail();
  // }, [eid]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="arrange" element={<OwnerForm handleEid={handleEid} />} />
          {/* {eventDetail ? (
            <Route
              path="details"
              // element={<EventDetail eid={eid} />}
              element={<EventDetail eid={eid} eventDetail={eventDetail} />}
            />
          ) : (
            "Loading..."
          )} */}
          <Route path="details" element={<EventDetailFetcher eid={eid} />} />
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
  } = useQuery(
    ["eventDetail", eid],
    async () => {
      const response = await axios.get(
        `http://localhost:8000/showEvent/${eid}`
      );
      return response.data;
    },
    { enabled: !!eid }
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <EventDetail eid={eid} eventDetail={eventDetail} />;
}

export default App;
