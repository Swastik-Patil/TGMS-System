import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BeatLoader from "react-spinners/BeatLoader";
import Header from "./Header";
import { getDatabase, ref as Ref, child, get } from "firebase/database";
import { useAuth } from "../contexts/AuthContext";

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
          setData(d);
          window.localStorage.setItem("data", JSON.stringify(d));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    readUserPastData();
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => {};
  }, []);

  const navItems = [
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
          <Header navItems={navItems} />
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
