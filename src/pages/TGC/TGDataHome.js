import React, { useState, useEffect, useRef } from "react";
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
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  update,
  ref as dbRef,
  getDatabase,
  get,
  child,
} from "firebase/database";
import styled from "styled-components";

function TGDataHome() {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const toast = useToast();
  const admissionNoRef = useRef(null);
  const nameRef = useRef(null);
  const rollRef = useRef(null);
  const classRef = useRef(null);
  const OverlayOne = () => <ModalOverlay backdropFilter="blur(10px)" />;
  const columns = [
    {
      key: "RNo",
      label: "Roll No.",
    },
    {
      key: "Class",
      label: "Class",
    },
    {
      key: "NameoftheStudents",
      label: "Name of the Student",
    },
    {
      key: "actions",
      label: "Actions",
    },
  ];

  function saveStudent() {
    let div = window.sessionStorage.getItem("selectedTG");
    const db = getDatabase();
    update(
      dbRef(db, "/tgmsData/" + div + "/" + admissionNoRef.current?.value + "/"),
      {
        NameoftheStudents: nameRef.current?.value,
        NameoftheFaculty: window.sessionStorage.getItem("selectedTG"),
        Class: classRef.current?.value,
        RollNo: rollRef.current?.value,
        AdmissionNo: admissionNoRef.current?.value,
      }
    ).then(() => {
      onClose1();
      toast({
        position: "top-right",
        description: "Student Added Successfully",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.href = "/TGCHome";
      }, 1500);
    });
  }

  useEffect(() => {
    let data = JSON.parse(window.sessionStorage.getItem("tgData"));
    setData(data);
  }, []);

  return (
    <>
      <Header />
      <TableParent>
        {data && (
          <>
            <div className="flex flex-col gap-4">
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"items-end"}
                gap="2"
              >
                <Input
                  className="w-full sm:max-w-[44%]"
                  placeholder="Search by name or roll number"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                />
                <div style={{ width: "40px" }}> </div>
                <Button colorScheme="blue" onClick={onOpen1}>
                  Add New
                </Button>
              </Box>
            </div>
            <TableContainer>
              <Table id="myTable1" variant="simple">
                <TableCaption>TG List</TableCaption>
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
                        : String(ele["NameoftheStudents"])
                            .toLowerCase()
                            .includes(searchTerm) ||
                            String(ele["RollNo"])
                              .toLowerCase()
                              .includes(searchTerm);
                    })
                    .map((ele, index) => {
                      ele.NameoftheStudents = String(ele.NameoftheStudents)
                        .toLowerCase()
                        .replace(/\b(\w)/g, (s) => s.toUpperCase());
                      return (
                        <Tr key={index}>
                          <Td>{ele.RollNo}</Td>
                          <Td>{ele.Class}</Td>
                          <Td>{ele.NameoftheStudents}</Td>
                          <Td style={{ display: "flex", gap: ".5rem" }}>
                            <Button
                              colorScheme="red"
                              onClick={() => {
                                alert("Deleted");
                              }}
                            >
                              Delete
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
        initialFocusRef={admissionNoRef}
        isOpen={isOpen1}
        onClose={onClose1}
        motionPreset="slideInBottom"
      >
        <OverlayOne />
        <ModalContent>
          <ModalHeader>Add Class Coordinator</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Admission No</FormLabel>
              <Input ref={admissionNoRef} placeholder="Enter Admission No" />
            </FormControl>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input ref={nameRef} placeholder="Last First Middle" />
            </FormControl>
            <FormControl>
              <FormLabel>Roll No</FormLabel>
              <Input ref={rollRef} placeholder="Enter Roll No" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Class</FormLabel>
              <Input ref={classRef} placeholder="Enter Class and Div" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={saveStudent}>
              Save
            </Button>
            <Button onClick={onClose1}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const TableParent = styled.div`
  padding: 1rem;
`;
export default TGDataHome;
