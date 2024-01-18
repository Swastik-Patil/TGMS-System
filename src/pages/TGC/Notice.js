import React, { useEffect, useState } from "react";
import "../../styles/print.css";
import "../../styles/BonafidePreview.css";
// import { ref as dbref, child, get } from "firebase/database";
import BeatLoader from "react-spinners/BeatLoader";
import logo from "../../res/MES Flower.png";

export default function Notice() {
  const [userData, setUserData] = useState(null);
  // const [branch, setBranch] = useState(null);
  // const [enroll, setEnroll] = useState(null);
  // const [actionDate, setActionDate] = useState(null);
  const [loading, setLoading] = useState(true);

  function readNoticeData() {
    let data = JSON.parse(window.localStorage.getItem("SlowStudents")).map(
      (ele) => {
        return JSON.parse(ele);
      }
    );

    data = data.map((ele) => {
      return {
        admissionNo: ele.admissionNo,
        name: ele.name,
        rNo: ele.rNo,
        class: "TE A",
      };
    });

    setUserData(data);
    console.log(userData);
    setLoading(false);
  }

  function handleBack() {
    window.location.href = "/home";
  }

  // function formatNo(No) {
  //   let no = new String(No);
  //   if (no.length != 3) {
  //     while (no.length < 3) {
  //       no = "0" + no;
  //     }
  //   }
  //   return no;
  // }

  useEffect(() => {
    readNoticeData();
  }, []);

  function PrintDoc() {
    var Btns = document.getElementById("Actions");
    Btns.style.visibility = "hidden";
    window.print();
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      {loading ? (
        <BeatLoader color="#1A2B40" size={18} margin={2} loading={loading} />
      ) : (
        <div className="container">
          <div id="bc__doc">
            <div className="bc__Border1">
              <div className="bc__Border2">
                <div className="bc__heading">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      className="bc__logo"
                      //   src={logo}
                      alt="Logo"
                      id="logo"
                      srcSet=""
                    />
                  </div>
                  <div>
                    <p className="bc__header" id="clgTitle">
                      Pillai HOC College of Engineering and Technology
                    </p>
                    <p style={{ fontSize: "small" }}>Header </p>
                  </div>
                </div>
                <div className="dash"></div>

                <div id="notice-container">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={logo} alt="logo" />

                    <h3>
                      PILLAI HOC COLLEGE OF ENGINEERING AND TECHNOLOGY,
                      RASAYANI.
                    </h3>
                  </div>
                  <h2>NOTICE</h2>

                  <label for="studentName">Student Names</label>
                  <p id="studentName"></p>

                  <label for="content">Title</label>
                  <p id="content"></p>

                  <div class="signature">
                    <label for="sign">Sign</label>
                    <p id="sign"></p>
                  </div>
                  <button type="button">Send</button>
                </div>

                <div className="bc__Signatures">
                  <div className="bc__clerk">
                    <h3 className="signText">
                      <br />
                      HOD Computer
                    </h3>
                  </div>
                  <div className="bc__principal">
                    <h3 className="signText">
                      <br />
                      Principal
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="Actions">
            <input
              type="button"
              onClick={PrintDoc}
              id="printBtn"
              value="Print"
              className="btns"
            />
            <input
              type="button"
              onClick={handleBack}
              id="printBtn"
              value="Go Back"
              className="btn btn-danger"
            />
          </div>
        </div>
      )}
    </div>
  );
}
