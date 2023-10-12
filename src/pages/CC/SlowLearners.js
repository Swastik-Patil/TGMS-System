import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import styled from "styled-components";
import { ref as dbref, get, child, getDatabase } from "firebase/database";

function SlowLearners() {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
      key: "status",
      label: "Student Type",
    },
    {
      key: "details",
      label: "Details",
    },
  ];

  useEffect(() => {
    checkUser();
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
                          <Td>{ele.studentType}</Td>
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
    </>
  );
}

const TableParent = styled.div`
  padding: 1rem;
`;
export default SlowLearners;
