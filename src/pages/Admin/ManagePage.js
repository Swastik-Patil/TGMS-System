import React, { useEffect, useState, useRef } from "react";
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
  Skeleton,
  Button,
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { getDatabase, ref as Ref, child, get, remove } from "firebase/database";

function ManagePage() {
  const [loading, setLoading] = useState(true);
  const [ccNames, setCCNames] = useState(null);
  const [CCData, setCCData] = useState(null);
  const [TTCData, setTTCData] = useState(null);
  const [TGCData, setTGCData] = useState(null);
  const [selectedCC, setSelectedCC] = useState(null);
  const columns = [
    {
      key: "SrNo",
      label: "Sr. No.",
    },
    {
      key: "empId",
      label: "Faculty Id",
    },
    {
      key: "NameoftheFaculty",
      label: "Name of the Faculty",
    },
    {
      key: "Post",
      label: "Post",
    },
    {
      key: "actions",
      label: "Actions",
    },
  ];

  async function getAllData() {
    let data = JSON.parse(window.localStorage.getItem("CCData"));
    let d = Object.keys(data).map((key) => {
      return data[key];
    });
    setCCData(d);

    const db = Ref(getDatabase());
    try {
      const snapshot = await get(child(db, "/TTCData/"));
      if (snapshot.exists()) {
        let data = snapshot.val();
        data = Object.keys(data).map((key) => data[key]);
        setTTCData(data);
      } else {
        console.log("No data available");
      }
      const snapshot2 = await get(child(db, "/TGCData/"));
      if (snapshot2.exists()) {
        let data = snapshot2.val();
        data = Object.keys(data).map((key) => data[key]);
        setTGCData(data);
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  async function deleteCC() {
    const database = getDatabase();
    const databaseReference = Ref(
      database,
      "CCData/" + String(selectedCC.name)
    );

    await remove(databaseReference);
    window.location.href = "/AdminHome";
  }

  const [isOpen1, setIsOpen1] = useState(false);
  const cancelRef1 = useRef();
  async function deleteTGC() {
    const database = getDatabase();
    const databaseReference = Ref(
      database,
      "TGCData/" + String(selectedCC.name)
    );

    await remove(databaseReference);
    window.location.href = "/AdminHome";
  }

  const [isOpen2, setIsOpen2] = useState(false);
  const cancelRef2 = useRef();
  async function deleteTTC() {
    const database = getDatabase();
    const databaseReference = Ref(
      database,
      "TTCData/" + String(selectedCC.name)
    );

    await remove(databaseReference);
    window.location.href = "/AdminHome";
  }

  useEffect(() => {
    getAllData();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
          paddingInline: "2rem",
        }}
      >
        {/* CC TABLE */}
        <div>
          {loading ? (
            <TableContainer>
              <Table variant="simple">
                <TableCaption placement="top" style={{ marginTop: 0 }}>
                  Class Coordinator Table
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Sr. No.</Th>
                    <Th>Name of the Faculty</Th>
                    <Th>Class</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <Skeleton height={"30px"} />
                    </Td>
                    <Td>
                      <Skeleton height={"30px"} />
                    </Td>
                    <Td>
                      <Skeleton height={"30px"} />
                    </Td>
                    <Td>
                      <Skeleton height={"30px"} />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Skeleton height={"30px"} />
                    </Td>
                    <Td>
                      <Skeleton height={"30px"} />
                    </Td>
                    <Td>
                      <Skeleton height={"30px"} />
                    </Td>
                    <Td>
                      <Skeleton height={"30px"} />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            <TableContainer>
              <Table variant="simple">
                <TableCaption placement="top" style={{ marginTop: 0 }}>
                  Class Coordinator Table
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Sr. No.</Th>
                    <Th>Name of the Faculty</Th>
                    <Th>Class</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {CCData &&
                    CCData.map((ele, index) => {
                      return (
                        <Tr key={index}>
                          <Td>{++index}</Td>
                          <Td>{ele.name}</Td>
                          <Td>
                            {String(ele.class).slice(0, -1) +
                              " " +
                              String(ele.class).slice(-1)}
                          </Td>
                          <Td>
                            <Button
                              colorScheme="red"
                              onClick={() => {
                                setIsOpen(true);
                                setSelectedCC(ele);
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
          )}
        </div>
        {/* TGC TABLE */}
        <div>
          {loading ? (
            <TableContainer>
              <Table variant="simple">
                <TableCaption placement="top" style={{ marginTop: 0 }}>
                  TG Coordinator
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Sr. No.</Th>
                    <Th>Name of the Faculty</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <Skeleton height={"30px"} />
                    </Td>
                    <Td>
                      <Skeleton height={"30px"} />
                    </Td>
                    <Td>
                      <Skeleton height={"30px"} />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            <TableContainer>
              <Table variant="simple">
                <TableCaption placement="top" style={{ marginTop: 0 }}>
                  TG Coordinator
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Sr. No.</Th>
                    <Th>Name of the Faculty</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {TGCData &&
                    TGCData.map((ele, index) => {
                      return (
                        <Tr key={index}>
                          <Td>{++index}</Td>
                          <Td>{ele.name}</Td>
                          <Td>
                            <Button
                              colorScheme="red"
                              onClick={() => isOpen1(true)}
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
          )}
        </div>
        {/* TTC TABLE */}
        <div>
          {loading ? (
            <TableContainer>
              <Table variant="simple">
                <TableCaption placement="top" style={{ marginTop: 0 }}>
                  TimeTable Coordinator
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Sr. No.</Th>
                    <Th>Name of the Faculty</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <Skeleton height={"30px"} />
                    </Td>
                    <Td>
                      <Skeleton height={"30px"} />
                    </Td>
                    <Td>
                      <Skeleton height={"30px"} />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            <TableContainer>
              <Table variant="simple">
                <TableCaption placement="top" style={{ marginTop: 0 }}>
                  TimeTable Coordinator
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Sr. No.</Th>
                    <Th>Name of the Faculty</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {TTCData &&
                    TTCData.map((ele, index) => {
                      return (
                        <Tr key={index}>
                          <Td>{++index}</Td>
                          <Td>{ele.name}</Td>
                          <Td>
                            <Button
                              colorScheme="red"
                              onClick={() => isOpen2(true)}
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
          )}
        </div>
      </div>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Click confirm for deleting CC.
            </AlertDialogHeader>

            <AlertDialogFooter>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={deleteCC} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <AlertDialog
        isOpen={isOpen1}
        leastDestructiveRef={cancelRef1}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Click confirm for deleting TG Coordinator.
            </AlertDialogHeader>

            <AlertDialogFooter>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={deleteTGC} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <AlertDialog
        isOpen={isOpen2}
        leastDestructiveRef={cancelRef2}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Click confirm for deleting CC.
            </AlertDialogHeader>

            <AlertDialogFooter>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={deleteTTC} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default ManagePage;
