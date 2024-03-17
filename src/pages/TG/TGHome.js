import React, { useState, useEffect } from "react";
import { ref as dbref, get, child, getDatabase } from "firebase/database";
import {
  Text,
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
import { IoIosNotifications, IoIosNotificationsOff } from "react-icons/io";

import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../../components/Header";
import { set } from "firebase/database";
import { database } from "../../utils/init-firebase";

function TGHOME() {
  const { currentUser } = useAuth();
  const [data, setData] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [currUID, setCurrUID] = useState("");
  const observationsRef = React.useRef(null);

  const OverlayOne = () => <ModalOverlay backdropFilter="blur(10px)" />;
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

  function showApplicationDetails(uid) {
    window.sessionStorage.setItem("selectedStudent", String(uid));
    window.sessionStorage.setItem("showPanel", true);
    window.sessionStorage.setItem("path", "/StudentsData");
    window.location.href = "/Details";
  }

  const columns = [
    {
      key: "id",
      label: "Sr.No.",
    },
    {
      key: "Class",
      label: "Class",
    },
    {
      key: "RollNo",
      label: "Roll No",
    },
    {
      key: "NameoftheStudents",
      label: "Name of the Students",
    },
    {
      key: "StudentType",
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
      key: "notification",
      label: "Notification",
    },
    {
      key: "details",
      label: "Details",
    },
  ];

  useEffect(() => {
    let usertype = window.localStorage.getItem("usertype");
    if (usertype === "Teacher Guardian Coordinator") {
      window.location.href = "/TGCHome";
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
    const db = dbref(getDatabase());
    get(child(db, "tgEmails"))
      .then(async (snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          // eslint-disable-next-line array-callback-return
          let name = data.map((ele) => {
            if (String(ele.email) === String(currentUser.email)) {
              return ele.name;
            }
          });
          name = String(name.filter((n) => n));

          get(child(db, "/tgmsData/" + name)).then(async (snapshot) => {
            if (snapshot.exists()) {
              let res = snapshot.val();
              if (!Array.isArray(res)) {
                res = Object.keys(res).map((key) => {
                  return res[key];
                });
              }
              res = res.filter((ele) => {
                return ele != null;
              });

              const promises = res.map((ele) =>
                get(child(db, "/StudentsData/" + ele.admissionNo + "/"))
              );

              const snapshots = await Promise.all(promises);

              res = snapshots.map((snapshot, index) => {
                if (snapshot.exists()) {
                  let r = snapshot.val();
                  if (r.studentType === undefined) {
                    r.studentType = "Not Determined";
                  }
                  return {
                    ...res[index],
                    studentType: r.studentType,
                    points: r.points,
                    mails: r.mails,
                  };
                }
                return { ...res[index] };
              });
              setData(res);
            } else {
              console.log("No data available");
            }
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentUser.email]);

  async function sendNotice() {
    let str = "https://mail.google.com/mail/?view=cm&fs=1&to=";
    const dbRef = dbref(getDatabase());

    try {
      let arr = [];

      data.forEach((ele) => {
        arr.push(ele.admissionNo);
      });

      if (arr.length > 0) {
        const promises = arr.map((ele) =>
          get(child(dbRef, "/StudentsData/" + ele + "/email"))
        );

        const snapshots = await Promise.all(promises);

        snapshots.forEach((snapshot) => {
          if (snapshot.exists()) {
            let res = snapshot.val();
            str += String(res) + ",";
          }
        });
        if (str.length > 46) {
          window.open(str, "_blank");
        } else {
          throw Error("No Emails Found");
        }
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }
  }

  function addNewObservations() {
    if ((observationsRef.current?.value).trim() !== "") {
      set(
        dbref(database, `StudentsData/${currUID}/observations`),
        observationsRef.current?.value
      ).then(() => {
        onClose1();
        window.location.reload();
      });
    }
  }

  function handleNotification(mails) {
    mails = Object.keys(mails).map((key) => mails[key]);
    const lastMail = Object.values(mails).pop();

    if (lastMail) {
      const { subject, message } = lastMail;
      setSubject(subject);
      setMessage(message);
      onOpen2(); // Open the modal to display mail details
    } else {
      console.log("No mails found for this student.");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
      }}
    >
      <Header />
      <TableParent>
        {data && (
          <>
            <div className="flex flex-col gap-4">
              <div style={{ display: "flex", gap: "1rem" }}>
                <Input
                  className="w-full sm:max-w-[44%]"
                  placeholder="Search by name..."
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                />
                <Button colorScheme="blue" onClick={sendNotice}>
                  Send Notice
                </Button>
              </div>
            </div>
            <TableContainer>
              <Table id="myTable" variant="simple">
                <TableCaption>Student List</TableCaption>
                <Thead>
                  <Tr>
                    {columns.map((ele) => {
                      return <Th key={ele.key}>{ele.label}</Th>;
                    })}
                  </Tr>
                </Thead>
                <Tbody>
                  {data
                    .filter((ele) => {
                      return filterValue === ""
                        ? ele
                        : ele.NameoftheStudents.toLowerCase().includes(
                            filterValue.toLowerCase()
                          ) ||
                            String(ele.RollNo)
                              .toLowerCase()
                              .includes(filterValue.toLowerCase());
                    })
                    .map((ele, index) => {
                      ele["NameoftheStudents"] = String(ele.NameoftheStudents)
                        .toLowerCase()
                        .replace(/\b(\w)/g, (s) => s.toUpperCase());
                      return (
                        <Tr key={index}>
                          <Td>{++index}</Td>
                          <Td>{ele.Class}</Td>
                          <Td>{ele.RollNo}</Td>
                          <Td>{ele.NameoftheStudents}</Td>
                          <Td> {ele.studentType}</Td>
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

                          <Td
                            position={"relative"}
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            padding={"1.4rem"}
                          >
                            {ele.mails ? (
                              <>
                                <IoIosNotifications
                                  size={30}
                                  cursor={"pointer"}
                                  color="#3182ce"
                                  onClick={() => handleNotification(ele.mails)}
                                />
                                <span>{ele.mails.length}</span>
                              </>
                            ) : (
                              <IoIosNotificationsOff
                                size={30}
                                color="#3182ce"
                              />
                            )}
                          </Td>
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
                    <Textarea
                      placeholder="Observations"
                      ref={observationsRef}
                    />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={addNewObservations}
                  >
                    Save
                  </Button>
                  <Button onClick={onClose1}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Modal
              isOpen={isOpen2}
              onClose={onClose2}
              motionPreset="slideInBottom"
            >
              <OverlayOne />
              <ModalContent>
                <ModalHeader>Notification</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  {subject && message ? (
                    <MailCard>
                      <Subject>{subject}</Subject>
                      <Message>{message}</Message>
                    </MailCard>
                  ) : (
                    <MailCard>
                      <Text>No Pending Message</Text>
                    </MailCard>
                  )}
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
        )}
      </TableParent>
    </div>
  );
}
const TableParent = styled.div`
  padding: 1rem;
`;

const MailCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const Subject = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Message = styled.div`
  margin-bottom: 10px;
`;

export default TGHOME;
