import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export const UploadResults = () => {
  return (
    <div className="frame" style={{ flexDirection: "column" }}>
      <Header />
      <div className="div-3">
        <Link to="UploadPage">
          <div className="overlap">
            <div className="rectangle">
              <div className="text-wrapper">Internal Assessment I</div>
            </div>
          </div>
        </Link>
        <Link to="UploadPage">
          <div className="div-wrapper">
            <div className="rectangle">
              <div className="text-wrapper">Internal Assessment II</div>
            </div>
          </div>
        </Link>
        <Link to="UploadPage">
          <div className="overlap-group">
            <div className="rectangle">
              <div className="text-wrapper">Semester Result</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UploadResults;
