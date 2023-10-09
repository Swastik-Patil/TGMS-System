import React, { useState, useEffect } from "react";
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

function TGDataHome() {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
    </>
  );
}

const TableParent = styled.div`
  padding: 1rem;
`;
export default TGDataHome;
