import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getDatabase, ref as Ref, child, get, remove } from "firebase/database";
import { getStorage, ref as storageRef, deleteObject } from "firebase/storage";
import CertificateImage from "../res/certificate.png";
import Header from "../components/Header";
import {
  Button,
  SimpleGrid,
  Box,
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import BeatLoader from "react-spinners/BeatLoader";
import styled from "styled-components";

export default function UploadedCertificates() {
  const [files, setFiles] = useState(null);
  const [fileData, setFileData] = useState([]);
  const [admissionNo, setAdmissionNo] = useState("");
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const { currentUser } = useAuth();
  const cancelRef = useRef();

  function getData() {
    let data = JSON.parse(window.localStorage.getItem("data"));
    if (!data) return;
    setAdmissionNo(data[0].admissionNo);
    const dbRef = Ref(getDatabase());
    get(
      child(dbRef, "/StudentsData/" + data[0].admissionNo + "/certificateList/")
    )
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          data = Object.keys(data).map((key) => {
            return data[key];
          });
          setFiles(data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function handleCertificateDelete() {
    try {
      const storage = getStorage();
      const storageReference = storageRef(
        storage,
        "Certificates/" +
          admissionNo +
          "/" +
          fileData.certificateType +
          "/" +
          fileData.fileName
      );

      await deleteObject(storageReference);

      const database = getDatabase();
      const databaseReference = Ref(
        database,
        "StudentsData/" + admissionNo + "/certificateList/" + fileData.name
      );

      await remove(databaseReference);

      console.log("Image deleted successfully.");

      // Add Toast Here
      setIsOpen(false);
      window.location.href = "profile";
    } catch (error) {
      console.error("Error deleting image and URL:", error);
    }
  }

  useEffect(() => {
    getData();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const navItems = [
    {
      label: "Upload Certificates",
      href: "uploadCertificate",
    },
    {
      label: "Uploaded Certificates",
      href: "uploadedCertificates",
    },
  ];

  return (
    <>
      <Header navItems={navItems} />
      <Contain>
        {loading ? (
          <BeatLoader color="#1A2B40" size={18} margin={2} loading={loading} />
        ) : (
          <SimpleGrid
            spacing={4}
            padding={8}
            templateColumns="repeat(4, minmax(200px, 1fr))"
          >
            {files ? (
              files.map((file, index) => {
                return (
                  <Box
                    bg={"white"}
                    py="2"
                    boxShadow={{ md: "2px 3px 12px", base: "2px 2px 6px" }}
                    rounded={{ sm: "lg" }}
                    key={index}
                  >
                    <div style={{ paddingInline: "15px" }}>
                      <h4>{file.name}</h4>
                      <small>
                        {file.completionDate
                          ? `Completed On ` + file.completionDate
                          : "Date Unknown"}
                      </small>
                    </div>
                    <div style={{ paddingBlock: "10px" }}>
                      <img
                        alt="Card background"
                        src={CertificateImage}
                        width={270}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "row",
                        gap: "15px",
                      }}
                    >
                      <Button
                        display={{ base: "none", md: "inline-flex" }}
                        fontSize={"sm"}
                        fontWeight={600}
                        color={"white"}
                        bg={"red.400"}
                        _hover={{
                          bg: "red.300",
                          color: "red",
                        }}
                        onClick={() => {
                          setIsOpen(true);
                          setFileData(file);
                        }}
                      >
                        Delete
                      </Button>
                      <Button
                        as={"a"}
                        display={{ base: "none", md: "inline-flex" }}
                        fontSize={"sm"}
                        fontWeight={600}
                        color={"white"}
                        bg={"blue.400"}
                        href={file.downloadURL}
                        target={"_blank"}
                        _hover={{
                          bg: "blue.300",
                        }}
                      >
                        {/* {file.name} */}
                        Open
                      </Button>
                    </div>
                  </Box>
                );
              })
            ) : (
              <div>No Uploaded Documents</div>
            )}
          </SimpleGrid>
        )}
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Click confirm for deleting certificate.
              </AlertDialogHeader>

              <AlertDialogFooter>
                <Button colorScheme="red" onClick={onClose} ml={3}>
                  Cancel
                </Button>
                <Button
                  colorScheme="green"
                  onClick={handleCertificateDelete}
                  ml={3}
                >
                  Confirm
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Contain>
    </>
  );
}

const Contain = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
`;
