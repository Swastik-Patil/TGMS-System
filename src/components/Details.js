import React, { useEffect, useState } from "react";
import { ref as dbref, child, get } from "firebase/database";
import { database } from "../utils/init-firebase";
import styled from "styled-components";
import Header from "../components/Header";
import { Table, Tbody, Tr, Td, Button, Text } from "@chakra-ui/react";
import ActionControlPanel from "./ActionControlPanel";

function Details({ showActionPanel, navItems }) {
  const [pendingData, setPendingData] = useState(null);
  const [exams, setExams] = useState(null);
  const [results, setResults] = useState([]);
  const [showPanel, setShowPanel] = useState(false);

  function readUserCurrentData() {
    const db = dbref(database);
    if (window.sessionStorage.getItem("showPanel") === "true") {
      setShowPanel(true);
    }
    const IDRef = window.sessionStorage.getItem("selectedStudent");
    const path = window.sessionStorage.getItem("path");
    if (!IDRef) window.location.href = "/home";
    get(child(db, `${path}/${IDRef}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          let results = data.Results;
          setResults(results);
          setPendingData(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
        flexDirection: "column",
      }}
    >
      <Header navItems={navItems} />
      {pendingData && (
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
              >
                <Tbody>
                  <Tr
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingBlock: " 0.5rem",
                    }}
                  >
                    <Td
                      paddingBottom={0}
                      paddingTop={0}
                      border={0}
                      fontWeight={"bold"}
                    >
                      Full Name :
                    </Td>
                    <Td paddingBottom={0} paddingTop={0} border={0}>
                      {pendingData.name}
                    </Td>
                  </Tr>
                  <Tr
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingBlock: " 0.5rem",
                    }}
                  >
                    <Td
                      paddingBottom={0}
                      paddingTop={0}
                      border={0}
                      fontWeight={"bold"}
                    >
                      Mes ID :
                    </Td>
                    <Td
                      paddingBottom={0}
                      paddingTop={0}
                      border={0}
                      textOverflow={"ellipsis"}
                      maxW={"250px"}
                    >
                      {pendingData.mesId}
                    </Td>
                  </Tr>
                  <Tr
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingBlock: " 0.5rem",
                    }}
                  >
                    <Td
                      paddingBottom={0}
                      paddingTop={0}
                      border={0}
                      fontWeight={"bold"}
                    >
                      Personal Email :
                    </Td>
                    <Td paddingBottom={0} paddingTop={0} border={0}>
                      {pendingData.email}
                    </Td>
                  </Tr>
                  <Tr
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingBlock: " 0.5rem",
                    }}
                  >
                    <Td
                      paddingBottom={0}
                      paddingTop={0}
                      border={0}
                      fontWeight={"bold"}
                    >
                      Contact no :
                    </Td>
                    <Td paddingBottom={0} paddingTop={0} border={0}>
                      {pendingData.mobile}
                    </Td>
                  </Tr>
                  <Tr
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingBlock: " 0.5rem",
                    }}
                  >
                    <Td
                      paddingBottom={0}
                      paddingTop={0}
                      border={0}
                      fontWeight={"bold"}
                    >
                      Gender :
                    </Td>
                    <Td paddingBottom={0} paddingTop={0} border={0}>
                      {pendingData.gender}
                    </Td>
                  </Tr>
                  <Tr
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingBlock: " 0.5rem",
                    }}
                  >
                    <Td
                      paddingBottom={0}
                      paddingTop={0}
                      border={0}
                      fontWeight={"bold"}
                    >
                      Mother's Name :
                    </Td>
                    <Td paddingBottom={0} paddingTop={0} border={0}>
                      {pendingData.motherName}
                    </Td>
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
              >
                <Tbody>
                  <Tr
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingBlock: " 0.5rem",
                    }}
                  >
                    <Td
                      paddingBottom={0}
                      paddingTop={0}
                      border={0}
                      fontWeight={"bold"}
                    >
                      Roll no :
                    </Td>
                    <Td paddingBottom={0} paddingTop={0} border={0}>
                      {pendingData.rNo}
                    </Td>
                  </Tr>
                  <Tr
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingBlock: " 0.5rem",
                    }}
                  >
                    <Td
                      style={{
                        paddingBottom: "0rem",
                        paddingTop: "0rem",
                        border: "none",
                        fontWeight: "bold",
                      }}
                    >
                      Admission no :
                    </Td>
                    <Td paddingBottom={0} paddingTop={0} border={0}>
                      {pendingData.admissionNo}
                    </Td>
                  </Tr>
                  <Tr
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingBlock: " 0.5rem",
                    }}
                  >
                    <Td
                      paddingBottom={0}
                      paddingTop={0}
                      border={0}
                      fontWeight={"bold"}
                    >
                      Date of Birth :
                    </Td>
                    <Td paddingBottom={0} paddingTop={0} border={0}>
                      {String(pendingData.dateOfBirth).replaceAll("-", "/")}
                    </Td>
                  </Tr>
                  <Tr
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingBlock: " 0.5rem",
                    }}
                  >
                    <Td
                      paddingBottom={0}
                      paddingTop={0}
                      border={0}
                      fontWeight={"bold"}
                    >
                      Category :
                    </Td>
                    <Td paddingBottom={0} paddingTop={0} border={0}>
                      {pendingData.category}
                    </Td>
                  </Tr>
                  <Tr
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingBlock: " 0.5rem",
                    }}
                  >
                    <Td
                      paddingBottom={0}
                      paddingTop={0}
                      border={0}
                      fontWeight={"bold"}
                    >
                      State of Domacile :
                    </Td>
                    <Td paddingBottom={0} paddingTop={0} border={0}>
                      {pendingData.domacile}
                    </Td>
                  </Tr>
                  <Tr
                    paddingBlock={0}
                    display={"flex"}
                    flexDirection={"column"}
                  >
                    <Td
                      paddingBottom={0}
                      paddingTop={0}
                      border={0}
                      fontWeight={"bold"}
                    >
                      Mother's Contact :
                    </Td>
                    <Td paddingBottom={0} paddingTop={0} border={0}>
                      {pendingData.motherContact || "Unknown"}
                    </Td>
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
              >
                <Tbody>
                  <Tr
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingBlock: " 0.5rem",
                    }}
                  >
                    <Td
                      paddingBottom={0}
                      paddingTop={0}
                      border={0}
                      fontWeight={"bold"}
                    >
                      Current Address :
                    </Td>
                    <Td paddingBottom={0} paddingTop={0} border={0}>
                      {pendingData.currAddress}
                    </Td>
                  </Tr>
                  <Tr
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingBlock: " 0.5rem",
                    }}
                  >
                    <Td
                      paddingBottom={0}
                      paddingTop={0}
                      border={0}
                      fontWeight={"bold"}
                    >
                      Permanant Address :
                    </Td>
                    <Td paddingBottom={0} paddingTop={0} border={0}>
                      {pendingData.permAddress}
                    </Td>
                  </Tr>
                  <Tr
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingBlock: " 0.5rem",
                    }}
                  >
                    <Td
                      paddingBottom={0}
                      paddingTop={0}
                      border={0}
                      fontWeight={"bold"}
                    >
                      Father's Name :
                    </Td>
                    <Td paddingBottom={0} paddingTop={0} border={0}>
                      {pendingData.fatherName}
                    </Td>
                  </Tr>
                  <Tr
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingBlock: " 0.5rem",
                    }}
                  >
                    <Td
                      paddingBottom={0}
                      paddingTop={0}
                      border={0}
                      fontWeight={"bold"}
                    >
                      Father's Contact :
                    </Td>
                    <Td paddingBottom={0} paddingTop={0} border={0}>
                      {pendingData.fatherContact}
                    </Td>
                  </Tr>
                  <Tr
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingBlock: " 0.5rem",
                    }}
                  >
                    <Td
                      paddingBottom={0}
                      paddingTop={0}
                      border={0}
                      fontWeight={"bold"}
                    >
                      Father's Occupation :
                    </Td>
                    <Td paddingBottom={0} paddingTop={0} border={0}>
                      {pendingData.fatherOcc}
                    </Td>
                  </Tr>
                  <Tr
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingBlock: " 0.5rem",
                    }}
                  >
                    <Td
                      paddingBottom={0}
                      paddingTop={0}
                      border={0}
                      fontWeight={"bold"}
                    >
                      Mother's Occupation :
                    </Td>
                    <Td paddingBottom={0} paddingTop={0} border={0}>
                      {pendingData.motherOcc}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableHodler>
          </Holder>
          <DocumentHolder>
            <h3>Results</h3>
            <div>
              {Object.keys(results).map((semester) => (
                <div
                  key={semester}
                  style={{
                    gap: "0",
                  }}
                >
                  <Text fontWeight={"bold"} color={"red"}>
                    {semester}
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "4rem",
                      margin: "0",
                    }}
                  >
                    {Object.keys(results[semester]).map((exam) => (
                      <TableHodler key={exam}>
                        <Text fontWeight={"bold"} fontSize={"16px"}>
                          {exam}
                        </Text>
                        <Table
                          variant="simple"
                          colorScheme="gray"
                          size="md"
                          maxW={{ base: "400px", lg: "1300px" }}
                          borderRadius={{ lg: "20px" }}
                          background="white"
                        >
                          <Tbody>
                            {Object.entries(results[semester][exam]).map(
                              ([subject, marks]) => (
                                <Tr key={subject}>
                                  <Td fontWeight={"bold"}>{subject} :</Td>
                                  <Td>{marks}</Td>
                                </Tr>
                              )
                            )}
                          </Tbody>
                        </Table>
                      </TableHodler>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </DocumentHolder>
          {(showActionPanel || showPanel) && (
            <DocumentHolder>
              <h3>Documents</h3>
              <div>
                {pendingData.certificateList ? (
                  Object.keys(pendingData.certificateList)
                    .map((key) => {
                      return pendingData.certificateList[key];
                    })
                    .map((ele, index) => {
                      return (
                        <a
                          href={ele.downloadURL}
                          target="_blank"
                          rel="noreferrer"
                          key={index}
                        >
                          <Button bgColor="#0AA1DD" color="white">
                            {ele.name}
                          </Button>
                        </a>
                      );
                    })
                ) : (
                  <div>No Certificate Uploaded</div>
                )}
              </div>
            </DocumentHolder>
          )}
          {(showActionPanel || showPanel) && (
            <ActionPanelHolder>
              <ActionControlPanel ele={pendingData} />
            </ActionPanelHolder>
          )}
        </Content>
      )}
    </div>
  );
}

const Content = styled.div`
  width: 95%;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border-radius: 12px;
  box-shadow: 9px 14px 20px 0px #1d1d1d;
  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
  @media (max-width: 650px) {
    flex-direction: column;
    gap: 0px;
    font-size: 12px;
    width: 80%;
  }
`;
const Holder = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 426px) {
    grid-template-columns: 1fr;
  }
`;
const Title = styled.div`
  width: 95%;
  height: 40px;
  margin-top: 20px;
  border-bottom: 4px solid #147af2;
  font-size: 30px;
  padding-bottom: 12px;
  display: flex;
  align-items: center;
`;
const TableHodler = styled.div`
  table {
    tbody {
      tr {
        td {
          padding: 5px !important;
        }
      }
    }
  }
  @media (max-width: 650px) {
    margin: 0px 0px;

    table {
      tbody {
        tr {
          td {
            padding: 0 !important;
          }
        }
      }
    }
  }
`;
const DocumentHolder = styled.div`
  width: 90%;

  h3 {
    margin: 10px;
    font-weight: bold;
  }

  img {
    height: 186px;
    width: 186px;
  }

  div {
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    div {
      display: flex;
      flex-direction: column;
      margin: 10px;
      align-items: start;
      gap: 5px;

      @media (max-width: 649px) {
        flex-direction: column;
      }
    }
  }
`;
const ActionPanelHolder = styled.div`
  height: 55px;
  width: 95%;
  border-top: 4px solid #147af2;
`;

export default Details;
