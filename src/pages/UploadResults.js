import React from "react";
import "../styles/UploadResults.css";
import { Link } from "react-router-dom";

export const UploadResults = () => {
  return (
    <div className="upload-result">
      <div className="frame">
        <Link to="UploadPage">
          <div className="overlap">
            <div className="rectangle">
              <div className="text-wrapper">Internal Assessment -I</div>
            </div>
          </div>
        </Link>
        <Link to="UploadPage">
          <div className="overlap-group">
            <div className="rectangle">
              <div className="semester-result">
                Semester <br />
                Result
              </div>
            </div>
          </div>
        </Link>
        <Link to="UploadPage">
          <div className="div-wrapper">
            <div className="rectangle">
              <div className="div">Internal Assessment -II</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UploadResults;
