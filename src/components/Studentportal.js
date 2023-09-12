import React, { useState, useEffect } from "react";
import styled from "styled-components";
import newform from "../res/newfomlogo.png";
import myapplication from "../res/myApplication.png";
import pointer from "../res/pointer.png";
import Footer from "./Footer";
import BeatLoader from "react-spinners/BeatLoader";
import Header from "./Header";
import { useAuth } from "../contexts/AuthContext";
import { Route, Link } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, database } from "../utils/init-firebase";
import { getDatabase, ref as Ref, child, get, update } from "firebase/database";

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
          setData(data);
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
const Content = styled.div`
  position: relative;
  margin-top: 20px;
  width: auto;
  @media (max-width: 650px) {
    display: flex;
    flex-direction: column;
    a {
      width: auto;
      height: 120px;
    }
  }
`;
const Wrap = styled.div`
  display: flex;
  margin: 20px;
  padding: 10px;
  width: 13.3rem;
  height: 12.3rem;
  color: black;
  background-color: white;
  flex-direction: column;
  border: 1px solid white;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 2px double #2155cd;
  border-radius: 39px;
  align-items: center;
  justify-content: center;
  transition: all 250ms ease-in-out;
  cursor: pointer;
  img {
    margin-top: 30px;
    height: 4.5rem;
    width: 4.5rem;
  }
  p {
    font-weight: bold;
    color: #0aa1dd;
    margin-top: 20px;
    font-size: 1rem;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
      rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
      rgba(0, 0, 0, 0.09) 0px 32px 16px;
  }
  @media (max-width: 650px) {
    display: flex;
    width: 18.3rem;
    height: 5.4rem;
    border: 1px solid rgba(78, 75, 75, 0.6);
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    transition: all 250ms ease-in-out;
    cursor: pointer;
    img {
      margin-top: 10px;
      height: 3.2rem;
      width: 3.2rem;
    }
    p {
      font-weight: bold;
      color: black;
      margin-top: 5px;
      font-size: 0.9rem;
    }
  }
`;
