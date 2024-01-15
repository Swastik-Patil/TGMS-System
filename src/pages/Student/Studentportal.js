import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BeatLoader from "react-spinners/BeatLoader";
import Header from "../../components/Header";
import { getDatabase, ref as Ref, child, get, set } from "firebase/database";
import { useAuth } from "../../contexts/AuthContext";
import Details from "../../components/Details";
import StudentDetails from "../StudentDetail";

function Studentportal() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const { currentUser } = useAuth();

  function readUserPastData() {
    const dbRef = Ref(getDatabase());
    get(child(dbRef, `/EmailAdmissionNo`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          data = Object.keys(data).map((key) => {
            return data[key];
          });
          let d = data.filter((ele) => {
            return ele.email === currentUser.email;
          });
          window.sessionStorage.setItem("selectedStudent", d[0].admissionNo);
          window.sessionStorage.setItem("path", "StudentsData");
          setData(d);
          window.localStorage.setItem("data", JSON.stringify(d));
          setLoading(false);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    readUserPastData();
  }, []);

  const navItems = [
    {
      label: "Home",
      href: "home",
    },
    {
      label: "Upload Certificates",
      href: "uploadCertificate",
    },
    {
      label: "Uploaded Certificates",
      href: "uploadedCertificates",
    },
  ];

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
        <>
          <BeatLoader color="#1A2B40" size={18} margin={2} loading={loading} />
        </>
      ) : (
        <Contain>
          <StudentDetails navItems={navItems} />
        </Contain>
      )}
    </div>
  );
}

export default Studentportal;

const Contain = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (max-width: 650px) {
    position: absolute;
    width: auto;
  }
`;
