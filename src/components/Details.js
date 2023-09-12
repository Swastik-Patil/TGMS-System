import React, { useEffect, useState } from "react";
import { ref as dbref, child, get } from "firebase/database";
import { database } from "../utils/init-firebase";
import BeatLoader from "react-spinners/BeatLoader";
import styled from "styled-components";
import Header from "../components/Header";
import certificate from "../res/certificate.png";
import { Table, Tbody, Tr, Td, Button } from "@chakra-ui/react";
import ActionControlPanel from "./ActionControlPanel";
import edit from "../res/edit.svg";
import { capitaliseName, formatDate } from "../utils/helper";

function Details({ showActionPanel }) {
  const [loading, setLoading] = useState(true);
  const [pendingData, setPendingData] = useState(null);
  const [orgData, setOrgData] = useState(null);
  const [enroll, setEnroll] = useState(false);
  const [fullName, setFullName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };
  const handleRollNoChange = (event) => {
    setRollNo(event.target.value);
  };
  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
  };

  function editDetails(e) {
    const Edit = e.target.parentElement.childNodes[0];
    Edit.readOnly = false;
    Edit.style.border = "2px solid yellow";
    Edit.style.background = "whitesmoke";
    Edit.contentEditable = true;
  }

  function readAuthUser() {
    const db = dbref(database);
    get(child(db, `/orgData/${enroll}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const std_data = snapshot.val();
          setFullName(capitaliseName(std_data.fullName));
          setOrgData(std_data);
          setDateOfBirth(formatDate(std_data.dateOfBirth));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function readUserCurrentData() {
    const db = dbref(database);
    const IDRef = window.sessionStorage.getItem("selectedStudent");
    const path = window.sessionStorage.getItem("path");
    if (!IDRef) window.location.href = "/profile";
    get(child(db, `${path}/${IDRef}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setPendingData(data);
          setEnroll(data.enroll);
          setRollNo(data.rollNo);
          readAuthUser();
        } else {
          // window.location.href = "/login";
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  useEffect(() => {
    readUserCurrentData();
  }, []);

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
          {orgData ? (
            <Content>
              <Title>Student Details</Title>
              <Holder>
                <TableHodler>
                  <Table
                    variant="simple"
                    colorScheme="gray"
                    size="md"
                    maxW={{ base: "400px", lg: "1300px" }}
                    borderRadius={{ lg: "20px" }}
                    background="white"
                    margin={{
                      lg: "50px auto",
                      md: "50px auto",
                      base: "20px auto",
                    }}
                  >
                    <Tbody>
                      <Tr>
                        <Td fontWeight={"bold"}>Full Name :</Td>
                        {showActionPanel && pendingData.isPending ? (
                          <Td
                            className="data"
                            style={{
                              display: "flex",
                              gap: "2px",
                              alignItems: "center",
                            }}
                          >
                            <input
                              type="text"
                              className="input"
                              value={fullName}
                              readOnly={true}
                              onChange={handleFullNameChange}
                            />
                            <img
                              src={edit}
                              alt=""
                              id="editable"
                              className="edit"
                              onClick={editDetails}
                            />
                          </Td>
                        ) : (
                          <Td>{fullName}</Td>
                        )}
                      </Tr>
                      <Tr>
                        <Td fontWeight={"bold"}>Email :</Td>
                        <Td>{pendingData.email}</Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight={"bold"}>Contact no :</Td>
                        <Td>{pendingData.phone_no}</Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight={"bold"}>Date of Birth :</Td>
                        {showActionPanel && pendingData.isPending ? (
                          <Td
                            className="data"
                            style={{
                              display: "flex",
                              gap: "2px",
                              alignItems: "center",
                            }}
                          >
                            <input
                              type="text"
                              className="input"
                              value={dateOfBirth}
                              readOnly={true}
                              onChange={handleDateOfBirthChange}
                            />
                            <img
                              src={edit}
                              alt=""
                              id="editable"
                              className="edit"
                              onClick={editDetails}
                            />
                          </Td>
                        ) : (
                          <Td>
                            {new String(orgData.dateOfBirth).replaceAll(
                              ".",
                              "/"
                            )}
                          </Td>
                        )}
                      </Tr>
                    </Tbody>
                  </Table>
                </TableHodler>
                <TableHodler>
                  <Table
                    variant="simple"
                    colorScheme="gray"
                    size="md"
                    maxW={{ base: "400px", lg: "1300px" }}
                    borderRadius={{ lg: "20px" }}
                    background="white"
                    margin={{
                      lg: "50px auto",
                      md: "50px auto",
                      base: "20px auto",
                    }}
                  >
                    <Tbody>
                      <Tr>
                        <Td fontWeight={"bold"}>Enrollment no :</Td>
                        <Td>{enroll}</Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight={"bold"}>Branch and Year :</Td>
                        <Td>{pendingData.branch + " " + pendingData.year}</Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight={"bold"}>Roll no :</Td>
                        {showActionPanel && pendingData.isPending ? (
                          <Td
                            className="data"
                            style={{
                              display: "flex",
                              gap: "2px",
                              alignItems: "center",
                            }}
                          >
                            <input
                              type="text"
                              className="input"
                              value={rollNo}
                              readOnly={true}
                              onChange={handleRollNoChange}
                            />
                            <img
                              src={edit}
                              alt=""
                              id="editable"
                              className="edit"
                              onClick={editDetails}
                            />
                          </Td>
                        ) : (
                          <Td>{pendingData.rollNo}</Td>
                        )}
                      </Tr>
                      <Tr>
                        <Td fontWeight={"bold"}>Current Academic Year :</Td>
                        <Td>
                          {pendingData.cacyear +
                            " - " +
                            parseInt(
                              new Date(pendingData.cacyear).getFullYear() + 1
                            )
                              .toString()
                              .slice(2)}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight={"bold"}>Reason :</Td>
                        <Td>{pendingData.reason}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableHodler>
                <DocumentHolder>
                  <h3>Documents</h3>
                  <img src={certificate} alt="BirthCerti"></img>
                  <div>
                    <a
                      href={pendingData.idCard}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button bgColor="#0AA1DD" color="white">
                        View ID Card
                      </Button>
                    </a>
                    <a
                      href={pendingData.birthCerti}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button bgColor="#0AA1DD" color="white">
                        View Birth Certificate
                      </Button>
                    </a>
                  </div>
                </DocumentHolder>
              </Holder>

              <ActionPanelHolder>
                {!showActionPanel || !pendingData.isPending ? (
                  <a href="/profile">
                    <Button
                      colorScheme={"red"}
                      float="right"
                      marginTop={"10px"}
                    >
                      Back
                    </Button>
                  </a>
                ) : (
                  <ActionControlPanel
                    ele={pendingData}
                    fullNameModified={fullName}
                    rollNoModified={rollNo}
                    dateOfBirthModified={dateOfBirth}
                  />
                )}
              </ActionPanelHolder>
            </Content>
          ) : (
            readAuthUser()
          )}
        </Contain>
      )}
    </div>
  );
}

const Contain = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  background-color: #e8f9fd;
  @media (max-width: 650px) {
    position: absolute;
    height: 100%;
    width: 100%;
  }
`;
const Content = styled.div`
  color: black;
  margin-top: 80px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
  background-color: white;
  height: 550px;
  width: 90%;
  boder: 1px solid white;
  border-radius: 12px;
  box-shadow: 2px 3px 3px black;
  @media (max-width: 650px) {
    flex-direction: column;
    height: 600px;
    gap: 0px;
    font-size: 12px;
  }
`;
const Holder = styled.div`
  display: flex;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
  align-items: center;
  justify-content: center;
  padding: 10px 10px;
  height: auto;
  width: 100%;
  @media (max-width: 650px) {
    flex-direction: column;
    justify-content: initial;
    height: 600px;
    padding: 0px 0px;
  }
`;
const Title = styled.div`
  width: 95%;
  height: 40px;
  margin-top: 22px;
  border-bottom: 4px solid #147af2;
  font-size: 30px;
  padding-bottom: 12px;
  display: flex;
  align-items: center;
`;
const TableHodler = styled.div`
  margin: 5px 12px;
  @media (max-width: 650px) {
    margin: 0px 0px;
    width: 300px;
  }
`;

const DocumentHolder = styled.div`
  height: 350px;
  width: 250px;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 2px solid black;
  border-radius: 12px;
  box-shadow: 6px 6px 6px grey;

  h3 {
    margin: 10px;
    font-weight: bold;
  }

  img {
    height: 186px;
    width: 186px;
  }

  div {
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
`;

const ActionPanelHolder = styled.div`
  height: 55px;
  width: 95%;
  border-top: 4px solid #147af2;
`;

export default Details;
