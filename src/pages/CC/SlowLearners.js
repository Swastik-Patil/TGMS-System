import React, { useState, useEffect, useRef } from "react";
import "../../styles/SlowLearner.css";
import Header from "../../components/Header";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  Textarea,
} from "@chakra-ui/react";
import styled from "styled-components";
import { ref as dbref, get, child, getDatabase, set } from "firebase/database";
import { database } from "../../utils/init-firebase";
import youtube from "../../api/youtube";
import dotenv from "dotenv";

function SlowLearners() {
  const [data, setData] = useState(null);
  const [currUID, setCurrUID] = useState("");
  const observationsRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const OverlayOne = () => <ModalOverlay backdropFilter="blur(10px)" />;
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  const columns = [
    {
      key: "RollNo",
      label: "Roll No",
    },
    {
      key: "admissionNo",
      label: "Admission No",
    },
    {
      key: "NameoftheStudents",
      label: "Name of the Students",
    },
    {
      key: "TG",
      label: "TG Name",
    },
    {
      key: "status",
      label: "Student Type",
    },
    {
      key: "observations",
      label: "Faculty Observations",
    },
    {
      key: "points",
      label: "Points",
    },
    {
      key: "details",
      label: "Details",
    },
  ];

  useEffect(() => {
    checkUser();
    dotenv.config();
  }, []);

  function showApplicationDetails(uid) {
    window.sessionStorage.setItem("selectedStudent", String(uid));
    window.sessionStorage.setItem("showPanel", true);
    window.sessionStorage.setItem("path", "/StudentsData");
    window.location.href = "/Details";
  }

  async function checkUser() {
    const db = dbref(getDatabase());

    try {
      let currClass = window.localStorage.getItem("currClass");
      const snapshot = await get(
        child(db, "/ClassWiseData/" + currClass + "/")
      );
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
            result.push(res);
          }
        });

        setData(result);
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function addNewObservations() {
    // Adding loading spinner
    setLoading(true);
    if ((observationsRef.current?.value).trim() !== "") {
      let observations = (observationsRef.current?.value).toLowerCase();

      const response = await youtube.get("/search", {
        params: {
          q: observations,
          part: "snippet",
          maxResults: 3,
          type: "video",
          key: process.env.REACT_APP_KEY,
        },
      });

      set(
        dbref(database, `StudentsData/${currUID}/observations/`),
        observations
      );

      if (response.data.items.length > 0) {
        set(dbref(database, `StudentsData/${currUID}/facultyObservations/`), {
          observations: observationsRef.current?.value,
          resources: response.data.items,
        }).then(() => {
          onClose1();
          window.location.reload();
        });
      }
    }
    // Remove loading spinner
    setLoading(false);
  }

  return (
    <>
      <Header />
      <TableParent>
        {data && (
          <>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between gap-3 items-end">
                <Input
                  className="w-full sm:max-w-[44%]"
                  placeholder="Search by name or roll number"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                />
              </div>
            </div>
            <TableContainer>
              <Table id="myTable1" variant="simple">
                <TableCaption>Student List</TableCaption>
                <Thead>
                  <Tr>
                    {columns.map((ele) => (
                      <Th key={ele.key}>{ele.label}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {data
                    .filter((ele) => {
                      return searchTerm === ""
                        ? ele
                        : ele.name.toLowerCase().includes(searchTerm) ||
                            String(ele.rNo).includes(searchTerm);
                    })
                    .map((ele, index) => {
                      ele["name"] = String(ele.name)
                        .toLowerCase()
                        .replace(/\b(\w)/g, (s) => s.toUpperCase());
                      return (
                        <Tr key={index}>
                          <Td>{ele.rNo}</Td>
                          <Td>{ele.admissionNo}</Td>
                          <Td>{ele.name}</Td>
                          <Td>{ele.tg}</Td>
                          <Td>{ele.studentType}</Td>
                          <Td>
                            {ele.observations ? (
                              ele.observations
                            ) : (
                              <Button
                                colorScheme="blue"
                                onClick={() => {
                                  setCurrUID(ele.admissionNo);
                                  onOpen1();
                                }}
                              >
                                Add
                              </Button>
                            )}
                          </Td>
                          <Td>{ele.points ? ele.points : 0}</Td>
                          <Td>
                            <Button
                              colorScheme="blue"
                              onClick={() => {
                                showApplicationDetails(ele.admissionNo);
                              }}
                            >
                              View Details
                            </Button>
                          </Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              </Table>
            </TableContainer>
          </>
        )}
      </TableParent>
      <Modal
        initialFocusRef={observationsRef}
        isOpen={isOpen1}
        onClose={onClose1}
        motionPreset="slideInBottom"
      >
        <OverlayOne />
        <ModalContent>
          <ModalHeader>Faculty Observations</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea placeholder="Observations" ref={observationsRef} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={addNewObservations}
              isDisabled={loading}
            >
              {loading ? "Processing..." : "Save"}
            </Button>
            <Button onClick={onClose1} isDisabled={loading}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const TableParent = styled.div`
  padding: 1rem;
`;
export default SlowLearners;
