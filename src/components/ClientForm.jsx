import React from "react";
import { useParams } from "react-router-dom";

const ClientForm = () => {
  const { eid } = useParams();
  return <div>ClientForm: {eid}</div>;
};

export default ClientForm;
