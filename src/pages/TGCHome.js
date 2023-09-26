import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import "../styles/CCHome.css";
function TGCHome() {
  return (
    <div className="frame" style={{ flexDirection: "column" }}>
      <Header />
      <div className="div-2">
        <div className="div-3">
          <Link to="UploadTGData">
            <div className="overlap">
              <div className="rectangle">
                <div className="text-wrapper">Upload TG Data</div>
              </div>
            </div>
          </Link>
          <Link to="UpdateTG">
            <div className="add-slow-learners-wrapper">
              <div className="rectangle">
                <div className="add-slow-learners1">Update TG</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TGCHome;
