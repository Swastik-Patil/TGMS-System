import React from "react";
import "../styles/CCHome.css";
import { Link } from "react-router-dom";
import Header from "../components/Header";

function CChome() {
  return (
    <div className="frame">
      <Header />
      <div className="div-2">
        <div className="overlap-group-wrapper">
          <div className="overlap-group">
            <div className="text-wrapper-3">Name.</div>
            <div className="text-wrapper-4">Welcome,</div>
          </div>
        </div>
        <div className="div-3">
          <Link to="UploadResults">
            <div className="overlap">
              <div className="rectangle">
                <div className="upload-result1">
                  Upload <br />
                  Result
                </div>
              </div>
            </div>
          </Link>
          <div className="overlap-2">
            <div className="rectangle">
              <div className="generate-notice">
                Generate
                <br />
                Notice
              </div>
            </div>
          </div>
          <Link to="SlowLearners">
            <div className="add-slow-learners-wrapper">
              <div className="rectangle">
                <div className="add-slow-learners1">
                  Add Slow
                  <br />
                  Learners
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CChome;
