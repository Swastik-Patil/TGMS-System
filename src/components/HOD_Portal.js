import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import { useAuth } from "../contexts/AuthContext";
import Header from "./Header";
import HOD_Pending_Icon from "../res/HOD_Pending_Icon.png";
import HOD_Rejected_Icon from "../res/HOD_Rejected_Icon.png";
import HOD_Approved_Icon from "../res/HOD_Approved_Icon.png";

import BeatLoader from "react-spinners/BeatLoader";

function HOD_Portal() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  function checkAuthorization() {
    const emails = [
      "hodcomputer@gmail.com",
      "hodcivil@gmail.com",
      "hodmechanical@gmail.com",
      "hodchemical@gmail.com",
      "hodic@gmail.com",
    ];
    if (emails.indexOf(currentUser.email) === -1) {
      window.location.replace("/profile");
    }
  }

  useEffect(() => {
    checkAuthorization();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {};
  });

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
          <Header />
          <Content>
            <a href="/HODPending">
              <Wrap>
                <img src={HOD_Pending_Icon} alt="Pending_Icon" />
                <p>Pending Applications</p>
              </Wrap>
            </a>
            <a href="/HODApproved">
              <Wrap>
                <img src={HOD_Approved_Icon} alt="Approved_Icon" />
                <p>Approved Applications</p>
              </Wrap>
            </a>
            <a href="/HODRejected">
              <Wrap>
                <img src={HOD_Rejected_Icon} alt="Rejected_Icon" />
                <p>Rejected Applications</p>
              </Wrap>
            </a>
          </Content>
          <Footer />
        </Contain>
      )}
    </div>
  );
}

export default HOD_Portal;

const Contain = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;

  background: #e8f9fd;
  @media (max-width: 650px) {
    position: absolute;
    width: auto;
  }
`;
const Content = styled.div`
  position: relative;
  display: flex;
  color: transparent;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 100vh;
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
