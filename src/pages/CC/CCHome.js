import React, { useEffect } from "react";
import "../../styles/CCHome.css";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { useAuth } from "../../contexts/AuthContext";
import { child, get, getDatabase, ref } from "firebase/database";
import CheckAuthorization from "../../utils/CheckAuthorization";

function CChome() {
  const { currentUser } = useAuth();

  async function getCurrentUserData() {
    const db = ref(getDatabase());
    try {
      const snapshot = await get(child(db, "/CCData/"));
      if (snapshot.exists()) {
        let data = snapshot.val();
        data = Object.keys(data)
          .map((key) => data[key])
          .filter((ele) => ele.email === currentUser.email);
        window.localStorage.setItem("currClass", data[0].class);
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    let usertype = window.localStorage.getItem("usertype");
    if (usertype === "Teacher Guide") {
      window.location.href = "/TGHome";
    }
    if (usertype === "Teacher Guide Coordinator") {
      window.location.href = "/TGCHome";
    }
    if (usertype === "Admin") {
      window.location.href = "/AdminHome";
    }
    if (usertype === "Select an option") {
      window.location.href = "/home";
    }
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
                <div className="add-slow-learners1">View Class Data</div>
              </div>
            </div>
          </Link>
          <Link to="UploadStudentData">
            <div className="add-slow-learners-wrapper">
              <div className="rectangle">
                <div className="add-slow-learners1">Upload Class Data</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CChome;
