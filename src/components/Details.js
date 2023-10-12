import React, { useEffect, useState } from "react";
import { ref as dbref, child, get } from "firebase/database";
import { database } from "../utils/init-firebase";
import styled from "styled-components";
import Header from "../components/Header";
import { Table, Tbody, Tr, Td, Button, Text } from "@chakra-ui/react";
import ActionControlPanel from "./ActionControlPanel";

function Details({ showActionPanel, navItems }) {
  const [pendingData, setPendingData] = useState(null);
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
          setPendingData(data);
        } else {
          // window.location.href = "/login";
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
      {pendingData ? (
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
                  <Tr>
                    <Td fontWeight={"bold"}>Full Name :</Td>
                    <Td>{pendingData.name}</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight={"bold"}>Email :</Td>
                    <Td>{pendingData.email}</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight={"bold"}>Contact no :</Td>
                    <Td>{pendingData.mobile}</Td>
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
                  <Tr>
                    <Td fontWeight={"bold"}>Admission no :</Td>
                    <Td>{pendingData.admissionNo}</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight={"bold"}>Roll no :</Td>
                    <Td>{pendingData.rNo}</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight={"bold"}>Date of Birth :</Td>

                    <Td>
                      {String(pendingData.dateOfBirth).replaceAll("-", "/")}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableHodler>
          </Holder>
          <DocumentHolder>
            <h3>Results</h3>
            <div>
              {pendingData.Results && pendingData.Results["IA 1"] ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Text fontWeight={"bold"}>{"IA 1"}</Text>
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
                        <Tr>
                          <Td fontWeight={"bold"}>CN :</Td>
                          <Td>{pendingData.Results["IA 1"].CN}</Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight={"bold"}>DWM:</Td>
                          <Td>{pendingData.Results["IA 1"].DWM}</Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight={"bold"}>SE :</Td>
                          <Td>{pendingData.Results["IA 1"].SE}</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                    <Table
                      variant="simple"
                      colorScheme="gray"
                      size="md"
                      maxW={{ base: "400px", lg: "1300px" }}
                      borderRadius={{ lg: "20px" }}
                      background="white"
                    >
                      <Tbody>
                        <Tr>
                          <Td fontWeight={"bold"}>TCS :</Td>
                          <Td>{pendingData.Results["IA 1"].TCS}</Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight={"bold"}>IP :</Td>
                          <Td>{pendingData.Results["IA 1"].IP}</Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight={"bold"}>Total :</Td>
                          <Td>{pendingData.Results["IA 1"].Total}</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableHodler>
                </div>
              ) : null}
              {pendingData.Results && pendingData.Results["IA 2"] ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Text fontWeight={"bold"}>{"IA 2"}</Text>
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
                        <Tr>
                          <Td fontWeight={"bold"}>CN :</Td>
                          <Td>{pendingData.Results["IA 2"].CN}</Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight={"bold"}>DWM:</Td>
                          <Td>{pendingData.Results["IA 2"].DWM}</Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight={"bold"}>SE :</Td>
                          <Td>{pendingData.Results["IA 2"].SE}</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                    <Table
                      variant="simple"
                      colorScheme="gray"
                      size="md"
                      maxW={{ base: "400px", lg: "1300px" }}
                      borderRadius={{ lg: "20px" }}
                      background="white"
                    >
                      <Tbody>
                        <Tr>
                          <Td fontWeight={"bold"}>TCS :</Td>
                          <Td>{pendingData.Results["IA 2"].TCS}</Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight={"bold"}>IP :</Td>
                          <Td>{pendingData.Results["IA 2"].IP}</Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight={"bold"}>Total :</Td>
                          <Td>{pendingData.Results["IA 2"].Total}</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableHodler>
                </div>
              ) : null}
              {pendingData.Results && pendingData.Results["SEM"] ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Text fontWeight={"bold"}>{"IA 2"}</Text>
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
                        <Tr>
                          <Td fontWeight={"bold"}>CN :</Td>
                          <Td>{pendingData.Results["SEM"].CN}</Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight={"bold"}>DWM:</Td>
                          <Td>{pendingData.Results["SEM"].DWM}</Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight={"bold"}>SE :</Td>
                          <Td>{pendingData.Results["SEM"].SE}</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                    <Table
                      variant="simple"
                      colorScheme="gray"
                      size="md"
                      maxW={{ base: "400px", lg: "1300px" }}
                      borderRadius={{ lg: "20px" }}
                      background="white"
                    >
                      <Tbody>
                        <Tr>
                          <Td fontWeight={"bold"}>TCS :</Td>
                          <Td>{pendingData.Results["SEM"].TCS}</Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight={"bold"}>IP :</Td>
                          <Td>{pendingData.Results["SEM"].IP}</Td>
                        </Tr>
                        <Tr>
                          <Td fontWeight={"bold"}>Total :</Td>
                          <Td>{pendingData.Results["SEM"].Total}</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableHodler>
                </div>
              ) : null}
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
      ) : // readAuthUser()
      null}
    </div>
  );
}

const Content = styled.div`
  width: 80%;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border-radius: 12px;
  box-shadow: 9px 14px 20px 0px #1d1d1d;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
  @media (max-width: 650px) {
    flex-direction: column;
    height: 600px;
    gap: 0px;
    font-size: 12px;
  }
`;
const Holder = styled.div`
  width: 90%;
  display: flex;

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
  margin-top: 20px;
  border-bottom: 4px solid #147af2;
  font-size: 30px;
  padding-bottom: 12px;
  display: flex;
  align-items: center;
`;
const TableHodler = styled.div`
  @media (max-width: 650px) {
    margin: 0px 0px;
    width: 300px;
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
    display: flex;
    margin: 10px;
    align-items: center;
    gap: 5px;
  }
`;

const ActionPanelHolder = styled.div`
  height: 55px;
  width: 95%;
  border-top: 4px solid #147af2;
`;

export default Details;
