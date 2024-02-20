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
  Skeleton,
} from "@chakra-ui/react";
import { ref as dbRef, getDatabase, get, child } from "firebase/database";

function CertificatesList() {
  const [National, setNational] = useState(null);
  const [InterNational, setInterNational] = useState(null);
  const [Rest, setRest] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getAllCertificates() {
    const db = dbRef(getDatabase());
    try {
      const snapshot = await get(child(db, "AllCertificates/InterNational/"));
      if (snapshot.exists()) {
        let data = snapshot.val();
        data = Object.keys(data).map((key) => {
          data[key] = { ...data[key], title: key };
          return data[key];
        });
        setInterNational(data);
      } else {
        console.log("No data available");
      }
      const snapshot2 = await get(child(db, "AllCertificates/National/"));
      if (snapshot2.exists()) {
        let data = snapshot2.val();
        data = Object.keys(data).map((key) => {
          data[key] = { ...data[key], title: key };
          return data[key];
        });
        setNational(data);
      } else {
        console.log("No data available");
      }

      const snapshot3 = await get(child(db, "AllCertificates/Rest/"));
      if (snapshot3.exists()) {
        let data = snapshot2.val();
        data = Object.keys(data).map((key) => {
          data[key] = { ...data[key], title: key };
          return data[key];
        });
        console.log(data);
        setRest(data);
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllCertificates();
    setTimeout(() => {
      setLoading(false);
    }, 1500);
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
        {/* InterNational Level  TABLE */}
        <div>
          {loading ? (
            <TableContainer>
              <Table variant="simple">
                <TableCaption placement="top" style={{ marginTop: 0 }}>
                  InterNational Level Certificate
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Sr. No.</Th>
                    <Th>Name </Th>
                    <Th>Certificate Type</Th>
                    <Th>Completion Date</Th>
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
                  InterNational Level Certificate
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Sr. No.</Th>
                    <Th>Name </Th>
                    <Th>Certificate Type</Th>
                    <Th>Completion Date</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {InterNational &&
                    InterNational.map((ele, index) => {
                      return (
                        <Tr key={index}>
                          <Td>{++index}</Td>
                          <Td>{ele.title}</Td>
                          <Td>{ele.certificateType}</Td>
                          <Td>{ele.completionDate}</Td>
                          <Td>
                            <Button
                              as={"a"}
                              display={"inline-flex"}
                              fontSize={"sm"}
                              fontWeight={600}
                              color={"white"}
                              bg={"blue.400"}
                              href={ele.downloadURL}
                              target={"_blank"}
                              _hover={{
                                bg: "blue.300",
                              }}
                            >
                              Open
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
        {/* National Level Certificate TABLE */}
        <div>
          {loading ? (
            <TableContainer>
              <Table variant="simple">
                <TableCaption placement="top" style={{ marginTop: 0 }}>
                  National Level Certificate
                </TableCaption>
                <Thead>
                  <Th>Sr. No.</Th>
                  <Th>Name </Th>
                  <Th>Certificate Type</Th>
                  <Th>Completion Date</Th>
                  <Th>Action</Th>
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
                  National Level Certificate
                </TableCaption>
                <Thead>
                  <Th>Sr. No.</Th>
                  <Th>Name </Th>
                  <Th>Certificate Type</Th>
                  <Th>Completion Date</Th>
                  <Th>Action</Th>
                </Thead>
                <Tbody>
                  {National &&
                    National.map((ele, index) => {
                      return (
                        <Tr key={index}>
                          <Td>{++index}</Td>
                          <Td>{ele.title}</Td>
                          <Td>{ele.certificateType}</Td>
                          <Td>{ele.completionDate}</Td>
                          <Td>
                            <Button
                              as={"a"}
                              display={"inline-flex"}
                              fontSize={"sm"}
                              fontWeight={600}
                              color={"white"}
                              bg={"blue.400"}
                              href={ele.downloadURL}
                              target={"_blank"}
                              _hover={{
                                bg: "blue.300",
                              }}
                            >
                              Open
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
        {/* All Certificate TABLE */}
        <div>
          {loading ? (
            <TableContainer>
              <Table variant="simple">
                <TableCaption placement="top" style={{ marginTop: 0 }}>
                  All Certificates
                </TableCaption>
                <Thead>
                  <Th>Sr. No.</Th>
                  <Th>Name </Th>
                  <Th>Certificate Type</Th>
                  <Th>Completion Date</Th>
                  <Th>Action</Th>
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
                  All Certificates
                </TableCaption>
                <Thead>
                  <Th>Sr. No.</Th>
                  <Th>Name </Th>
                  <Th>Certificate Type</Th>
                  <Th>Completion Date</Th>
                  <Th>Action</Th>
                </Thead>
                <Tbody>
                  {Rest &&
                    Rest.map((ele, index) => {
                      return (
                        <Tr key={index}>
                          <Td>{++index}</Td>
                          <Td>{ele.title}</Td>
                          <Td>{ele.certificateType}</Td>
                          <Td>{ele.completionDate}</Td>
                          <Td>
                            <Button
                              as={"a"}
                              fontSize={"sm"}
                              fontWeight={600}
                              color={"white"}
                              bg={"blue.400"}
                              href={ele.downloadURL}
                              target={"_blank"}
                              _hover={{
                                bg: "blue.300",
                              }}
                            >
                              Open
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
    </>
  );
}

export default CertificatesList;
