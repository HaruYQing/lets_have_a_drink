import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import style from "./Landing.module.scss";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className={style.landingBgUrl}>
      <div className={style.landingGlass}>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <h1 className="font-special fs-larger fw-bold d-inline-block mb-3">
            揪愛喝手搖
          </h1>
          <p className="font-special fs-medium d-inline-block">
            揪團喝手搖也可以簡簡單單
          </p>
          <Button
            className="font-special fs-medium mt-5 d-inline-block"
            variant="success"
            size="lg"
            onClick={() => navigate("/arrange")}
          >
            開始揪團
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
