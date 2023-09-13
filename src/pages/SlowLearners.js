import React, { useState, useEffect } from "react";
import "../styles/SlowLearner.css";
import Header from "../components/Header";
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

function SlowLearners() {
  const [data, setData] = useState(null);
  const [filterValue, setFilterValue] = useState("");

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
      key: "status",
      label: "Student Type",
    },
    {
      key: "details",
      label: "Details",
    },
  ];

  const handleInputChange = (event) => {
    setFilterValue(event.target.value);
    match(event.target.value);
  };

  const match = (value) => {
    var table, tr, td1, i, txtValue;
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td1 = tr[i].getElementsByTagName("td")[3];
      if (td1) {
        txtValue =
          String(td1.textContent).trim() || String(td1.innerText).trim();
        if (txtValue.indexOf(value) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };

  useEffect(() => {
    // checkUser();
  }, []);

  // function checkUser() {
  //   const db = dbref(getDatabase());
  //   get(child(db, "tgEmails"))
  //     .then(async (snapshot) => {
  //       if (snapshot.exists()) {
  //         let data = snapshot.val();
  //         let name = data.map((ele) => {
  //           if (String(ele.email).includes(currentUser.split("@")[0])) {
  //             return ele.name;
  //           }
  //         });
  //         name = String(name.filter((n) => n))
  //           .split(".")[1]
  //           .trim();
  //         get(child(db, "/tgmsData/" + name)).then((snapshot) => {
  //           if (snapshot.exists()) {
  //             let data = snapshot.val();
  //             let keys = Object.keys(statusColorMap);
  //             data = data.map((ele) => {
  //               ele["status"] = keys[(keys.length * Math.random()) << 0];
  //               return {
  //                 ...ele,
  //               };
  //             });
  //             setData(data);
  //           } else {
  //             console.log("No data available");
  //           }
  //         });
  //       } else {
  //         console.log("No data available");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }
  return (
    <>
      <Header />
      <TableParent>
        {data ? (
          <>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between gap-3 items-end">
                <Input
                  className="w-full sm:max-w-[44%]"
                  placeholder="Search by name..."
                  value={filterValue}
                  onChange={handleInputChange}
                />
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
                  {data.map((ele, index) => {
                    return (
                      <Tr key={index}>
                        <Td>{ele.id}</Td>
                        <Td>{ele.Class}</Td>
                        <Td>{ele.RollNo}</Td>
                        <Td>{ele.NameoftheStudents}</Td>
                        <Td>{ele.status}</Td>
                        <Td>
                          <Button colorScheme="blue">View Details</Button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <>No Data available</>
        )}
      </TableParent>
    </>
  );
}

const TableParent = styled.div`
  padding: 1rem;
`;
export default SlowLearners;
