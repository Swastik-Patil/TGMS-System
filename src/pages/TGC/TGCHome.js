import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/CCHome.css";
import Header from "../../components/Header";
import { useToast } from "@chakra-ui/react";
import { getDatabase, ref as Ref, child, get } from "firebase/database";
import CheckAuthorization from "../../utils/CheckAuthorization";

function TGCHome() {
  const [data, setData] = useState(null);

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
  async function generateNotice() {
    const db = Ref(getDatabase());
    try {
      const snapshot = await get(child(db, "/ClassWiseData/TEA/"));
      if (snapshot.exists()) {
        let data = snapshot.val();
        let sortedEntries = Object.entries(data).sort(
          (a, b) => a[1].rNo - b[1].rNo
        );
        let sortedData = Object.fromEntries(sortedEntries);
        sortedData = Object.keys(sortedData).map((key) => key);
        let result = [];
        const promises = sortedData.map((ele) =>
          get(child(db, "/StudentsData/" + ele))
        );
        const snapshots = await Promise.all(promises);
        snapshots.forEach((snapshot) => {
          if (snapshot.exists()) {
            let res = snapshot.val();
            if (String(res.studentType) === "Slow") {
              result.push(JSON.stringify(res));
            }
          }
        });
        window.localStorage.setItem("SlowStudents", JSON.stringify(result));
        window.location.href = "Notice";
        // console.log(data);
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    let usertype = window.localStorage.getItem("usertype");
    if (usertype === "Teacher Guide") {
      window.location.href = "/TGHome";
    }
    if (usertype === "Class Coordinator") {
      window.location.href = "/CCHome";
    }
    if (usertype === "Admin") {
      window.location.href = "/AdminHome";
    }
    if (usertype === "Select an option") {
      window.location.href = "/home";
    }
  }, []);

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
          <div onClick={generateNotice}>
            <div className="overlap">
              <div className="rectangle">
                <div className="text-wrapper">Generate Notice</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TGCHome;
