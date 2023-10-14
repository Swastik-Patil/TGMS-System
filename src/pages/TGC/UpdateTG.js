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
import { useAuth } from "../../contexts/AuthContext";
import { BeatLoader } from "react-spinners";

function UpdateTG() {
  const [loading, setLoading] = useState(true);
  const [tgData, setTGData] = useState([]);
  const [tgNames, setTGNames] = useState([]);
  const [selectedTG, setSelectedTG] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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

  function showApplicationDetails(index, ele) {
    let data = tgData[index - 1];
    if (!Array.isArray(data)) {
      data = Object.keys(data).map((key) => {
        return data[key];
      });
    }

    window.sessionStorage.setItem("tgData", JSON.stringify(data));
    window.sessionStorage.setItem("selectedTG", ele);
    window.location.href = "/TGDataHome";
  }

  async function getTGData() {
    const db = dbref(getDatabase());

    try {
      const snapshot = await get(child(db, "/tgmsData"));
      if (snapshot.exists()) {
        let data = snapshot.val();
        let tgNames = Object.keys(data);
        let d = Object.keys(data).map((key) => {
          return data[key];
        });
        setTGData(d);
        setTGNames(tgNames);
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  }

  async function deleteTG() {
    const db = getDatabase();
    const databaseReference = dbref(db, "tgmsData/" + String(selectedTG));

    await remove(databaseReference);
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
              <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                  <Input
                    className="w-full sm:max-w-[44%]"
                    placeholder="Search by name or roll number"
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value.toLowerCase())
                    }
                  />
                </div>
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
                    {tgNames
                      .filter((ele) => {
                        return searchTerm === ""
                          ? ele
                          : ele.toLowerCase().includes(searchTerm);
                      })
                      .map((ele, index) => {
                        ele = String(ele)
                          .toLowerCase()
                          .replace(/\b(\w)/g, (s) => s.toUpperCase());
                        return (
                          <Tr key={index}>
                            <Td>{++index}</Td>
                            <Td>{ele.facutlyId || "Unknown"}</Td>
                            <Td>{ele}</Td>
                            <Td style={{ display: "flex", gap: ".5rem" }}>
                              <Button
                                colorScheme="blue"
                                onClick={() => {
                                  showApplicationDetails(index, ele);
                                }}
                              >
                                View Details
                              </Button>
                              <Button
                                colorScheme="red"
                                onClick={() => {
                                  setSelectedTG(ele);
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
