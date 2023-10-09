import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../../styles/CCHome.css";
import Header from "../../components/Header";
import { useToast } from "@chakra-ui/react";
import { getDatabase, ref as Ref, child, get } from "firebase/database";

function TGCHome() {
  const toast = useToast();
  function sendNotice() {
    const dbRef = Ref(getDatabase());
    let str = "https://mail.google.com/mail/?view=cm&fs=1&to=";
    get(child(dbRef, `/tgEmails`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          data.forEach((ele) => {
            str += String(ele.email) + ",";
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        window.location.href = str;
      });
  }

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
          <div onClick={sendNotice}>
            <div className="overlap">
              <div className="rectangle">
                <div className="text-wrapper">Notify TG</div>
              </div>
            </div>
          </div>
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
