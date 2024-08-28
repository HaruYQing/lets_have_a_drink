import React from "react";

const EventDetail = (props) => {
  const { eid, eventDetail } = props;
  console.log(eventDetail);

  return <div>EventDetail of Eid: {eid}</div>;
};

export default EventDetail;
