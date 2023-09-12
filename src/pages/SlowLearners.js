import React from "react";
import "../styles/SlowLearner.css";
import Header from "../components/Header";

export default function SlowLearners() {
  return (
    <div className="add-slow-learners">
      <Header />
      <div className="overlap">
        <div className="rectangle">
          <div className="div">
            <div className="navbar">
              <div className="text-wrapper-2">Sr.no</div>
              <div className="text-wrapper-3">Student Type</div>
              <div className="text-wrapper-4">Action</div>
              <div className="text-wrapper-5">Student Name</div>
              <div className="text-wrapper-6">Admission No.</div>
            </div>
          </div>
        </div>
      </div>
      <div className="overlap-group">
        <div className="text-wrapper-7">Search Here</div>
      </div>
      {/* <div className="text-wrapper-8">Class : TE-A</div> */}
    </div>
  );
}
