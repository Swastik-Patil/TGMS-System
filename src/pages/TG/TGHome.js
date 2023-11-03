import React, { useState, useEffect } from "react";
import { ref as dbref, get, child, getDatabase } from "firebase/database";
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
import { useAuth } from "../../contexts/AuthContext";
import Header from "../../components/Header";
import CheckAuthorization from "../../utils/CheckAuthorization";

function TGHOME() {
  const { currentUser } = useAuth();
  const [data, setData] = useState(null);
  const [filterValue, setFilterValue] = useState("");

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
      key: "details",
      label: "Details",
    },
  ];

  useEffect(() => {
    let usertype = window.localStorage.getItem("usertype");
    if (usertype === "Teacher Guide Coordinator") {
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
    checkUser();
  }, []);

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

  function checkUser() {
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
                  return { ...res[index], studentType: r.studentType };
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
    </div>
  );
}
const TableParent = styled.div`
  padding: 1rem;
`;

export default TGHOME;
