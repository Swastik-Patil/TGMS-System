import React, { useEffect } from "react";
import "../../styles/CCHome.css";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { useAuth } from "../../contexts/AuthContext";

function CChome() {
  const { currentUser } = useAuth();

  function getCurrentUserData() {}

  useEffect(() => {
    getCurrentUserData();
  }, []);

  return (
    <div className="frame" style={{ flexDirection: "column" }}>
      <Header />
      <div className="div-2">
        <div className="div-3">
          <Link to="UploadResults">
            <div className="overlap">
              <div className="rectangle">
                <div className="text-wrapper">Upload Result</div>
              </div>
            </div>
          </Link>
          <Link to="SlowLearners">
            <div className="add-slow-learners-wrapper">
              <div className="rectangle">
                <div className="add-slow-learners1">Add Slow Learners</div>
              </div>
            </div>
          </Link>
          <Link to="UploadStudentData">
            <div className="add-slow-learners-wrapper">
              <div className="rectangle">
                <div className="add-slow-learners1">Upload Student Data</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CChome;
