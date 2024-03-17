import React, { useEffect, useState } from "react";
import { ref as dbref, child, get, remove } from "firebase/database";
import { database } from "../utils/init-firebase";
import styled from "styled-components";
import Header from "../components/Header";
import {
  Table,
  Tbody,
  Tr,
  Td,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import ActionControlPanel from "./ActionControlPanel";
import { Card } from "./Card";
import SubHeader from "./SubHeader";

function Details({
  showActionPanel,
  navItems,
  subNavItems = [
    "Student Details",
    "Academics",
    "Extra Curricular",
    "Faculty Suggestions",
    "Conversations",
  ],
}) {
  const [pendingData, setPendingData] = useState(null);
  const [results, setResults] = useState([]);
  const [showPanel, setShowPanel] = useState(false);
  const [resources, setResources] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);

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
          if (data.facultyObservations) {
            setResources(data.facultyObservations.resources);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const OverlayOne = () => <ModalOverlay backdropFilter="blur(10px)" />;
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  function deleteResource() {
    remove(
      child(
        dbref(database),
        `StudentsData/${pendingData.mesId}/facultyObservations/resources/${selectedResource}`
      )
    );
  }

  const [Details, setDetails] = useState(true);
  const [Academics, setAcademics] = useState(false);
  const [ExtraCurricular, setExtraCurricular] = useState(false);
  const [FacultySuggestions, setFacultySuggestions] = useState(false);
  const [Conversations, setConversations] = useState(false);

  const loadRoute = (route) => {
    // Reset all states to false
    setDetails(false);
    setAcademics(false);
    setExtraCurricular(false);
    setFacultySuggestions(false);
    setConversations(false);
    switch (route) {
      case "Student Details":
        setDetails(true);
        break;
      case "Academics":
        setAcademics(true);
        break;
      case "Extra Curricular":
        setExtraCurricular(true);
        break;
      case "Faculty Suggestions":
        setFacultySuggestions(true);
        break;
      case "Conversations":
        setConversations(true);
        break;
      default:
        break;
    }
  };

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
        <>
          {/* Navigation Links */}
          <SubHeader subNavItems={subNavItems} loadRoute={loadRoute} />

          <Content>
            {Details && (
              <>
                <Title style={{ width: "95%" }}>Student Details</Title>
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
                            {String(pendingData.dateOfBirth).replaceAll(
                              "-",
                              "/"
                            )}
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
              </>
            )}

            {FacultySuggestions && (
              <ContentHolder>
                {pendingData.facultyObservations ? (
                  <>
                    <h4>{pendingData.facultyObservations.observations}</h4>
                    {resources && (
                      <div className="resources">
                        {resources.map((ele, index) => {
                          return (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                <span style={{ fontSize: "12px" }}>
                                  {ele.snippet.title}
                                </span>
                                {(showActionPanel || showPanel) && (
                                  <Button
                                    colorScheme="red"
                                    onClick={() => {
                                      onOpen1();
                                      setSelectedResource(index);
                                    }}
                                  >
                                    Delete
                                  </Button>
                                )}
                              </div>
                              <iframe
                                title={ele.snippet.title}
                                src={`https://www.youtube.com/embed/${ele.id.videoId}`}
                                key={ele.etag}
                                allowFullScreen
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ padding: "2rem" }}>No Faculty Suggetions</div>
                )}
              </ContentHolder>
            )}

            {Academics && (
              <ContentHolder>
                <h3>Results</h3>
                <div>
                  {results ? (
                    Object.keys(results).map((semester) => (
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
                    ))
                  ) : (
                    <div>No Results Uploaded</div>
                  )}
                </div>
              </ContentHolder>
            )}

            {ExtraCurricular && (showActionPanel || showPanel) && (
              <ContentHolder>
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
              </ContentHolder>
            )}

            {Conversations && (
              <ContentHolder>
                <h3>Conversations</h3>
                <div>
                  {pendingData.mails ? (
                    Object.keys(pendingData.mails).map((key) => {
                      return (
                        <Card key={key}>
                          <strong>{key}</strong>
                          <p>{pendingData.mails[key].subject}</p>
                          <p>{pendingData.mails[key].message}</p>
                        </Card>
                      );
                    })
                  ) : (
                    <div>No Conversations</div>
                  )}
                </div>
              </ContentHolder>
            )}

            {(showActionPanel || showPanel) && (
              <ActionPanelHolder>
                <ActionControlPanel ele={pendingData} />
              </ActionPanelHolder>
            )}
          </Content>
        </>
      )}
      <Modal isOpen={isOpen1} onClose={onClose1} motionPreset="slideInBottom">
        <OverlayOne />
        <ModalContent>
          <ModalHeader>Do you want to delete this resource ? </ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={deleteResource}>
              {"Delete"}
            </Button>
            <Button onClick={onClose1}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
  width: 100%;
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
const ContentHolder = styled.div`
  width: 95%;
  padding-top: 10px;

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

  .resources {
    grid-template-columns: 1fr 1fr 1fr;

    @media (max-width: 1268px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 426px) {
      grid-template-columns: 1fr;
    }

    iframe {
      width: 420px;
      height: 345px;

      @media (max-width: 768px) {
        width: 250px;
        height: 200px;
      }
    }

    div {
      @media (max-width: 768px) {
        width: 250px;
      }
    }
  }
`;
const ActionPanelHolder = styled.div`
  padding: 0.5rem;
  width: 95%;
  border-top: 4px solid #147af2;
`;

export default Details;
