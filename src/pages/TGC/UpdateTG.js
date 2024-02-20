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
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import styled from "styled-components";
import {
  ref as dbref,
  get,
  child,
  getDatabase,
  remove,
} from "firebase/database";
import { BeatLoader } from "react-spinners";

function UpdateTG() {
  const [loading, setLoading] = useState(true);
  const [tgData, setTGData] = useState([]);
  const [selectedTG, setSelectedTG] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

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
      key: "actions",
      label: "Actions",
    },
  ];

  useEffect(() => {
    getTGData();
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  function showApplicationDetails(ele) {
    window.sessionStorage.setItem("selectedTG", ele);
    window.location.href = "/TGDataHome";
  }

  async function getTGData() {
    const db = dbref(getDatabase());

    try {
      const snapshot = await get(child(db, "/TGData"));
      if (snapshot.exists()) {
        let data = snapshot.val();
        data = Object.keys(data).map((key) => {
          return data[key];
        });
        setTGData(data);
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTG() {
    const db = getDatabase();
    const databaseReference = dbref(db, "tgmsData/" + String(selectedTG));
    const databaseReference1 = dbref(db, "TGData/" + String(selectedTG));
    await remove(databaseReference);
    await remove(databaseReference1);
    setIsOpen(false);
  }

  return (
    <>
      <Header />
      {loading ? (
        <Contain>
          <BeatLoader color="#1A2B40" size={18} loading={loading} />
        </Contain>
      ) : (
        <TableParent>
          {tgData && (
            <>
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
                    {tgData.map((ele, index) => {
                      return (
                        <Tr key={index}>
                          <Td>{++index}</Td>
                          <Td>{ele.facultyId || "Unknown"}</Td>
                          <Td>{ele.name}</Td>
                          <Td style={{ display: "flex", gap: ".5rem" }}>
                            <Button
                              colorScheme="blue"
                              onClick={() => {
                                showApplicationDetails(ele.name);
                              }}
                            >
                              View Details
                            </Button>
                            <Button
                              colorScheme="red"
                              onClick={() => {
                                setSelectedTG(ele.name);
                                setIsOpen(true);
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
      )}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Click confirm for deleting TG.
            </AlertDialogHeader>

            <AlertDialogFooter>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={deleteTG} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

const TableParent = styled.div`
  padding: 1rem;
`;

const Contain = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
`;

export default UpdateTG;
