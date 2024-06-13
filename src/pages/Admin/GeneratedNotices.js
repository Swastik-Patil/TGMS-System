import React, { useState, useRef } from "react";
import Header from "../../components/Header";
import { ChevronDownIcon } from "../../utils/ChevronDownIcon";
import {
  ref as dbref,
  get,
  child,
  remove,
  getDatabase,
} from "firebase/database";
import {
  Table,
  Tr,
  Td,
  Th,
  Tbody,
  Thead,
  Button,
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from "@chakra-ui/react";
import BeatLoader from "react-spinners/BeatLoader";

function GeneratedNotices() {
  const [notices, setNotices] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [Class, setClass] = useState(null);
  const [Option, setOption] = useState("Select Class");
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  let allOptions = ["SE A", "SE B", "SE C", "TE A", "TE C", "BE A", "BE C"];

  async function handleUserTypeChange(e) {
    if (e.target.outerText === Option) {
      toast({
        position: "top-right",
        description: "Already selected !",
        status: "info",
        duration: 2500,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    setOption(e.target.outerText);
    setClass(e.target.outerText);
    document.querySelector(".select-wrapper").classList.toggle("active");
    setTimeout(() => {
      getNotices();
    }, 2000);
  }

  async function getNotices() {
    const db = dbref(getDatabase());
    try {
      let CName = document.querySelector(".select-button-text").innerText;
      await get(child(db, "/notices/" + CName)).then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();

          data = Object.keys(data).map((key) => data[key]);
          setNotices(data);
          setLoading(false);
        } else {
          toast({
            position: "top-right",
            description: "No data available",
            status: "error",
            duration: 2500,
            isClosable: true,
          });
          setClass(null);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleNoticeDelete() {
    const database = getDatabase();
    const databaseReference = dbref(
      database,
      "notices/" + Class + "/" + selectedNotice.date
    );

    await remove(databaseReference);
    toast({
      position: "top-right",
      description: "Notice Deleted Successfully",
      status: "success",
      duration: 2500,
      isClosable: true,
    });
    setIsOpen(false);
    getNotices();
  }

  return (
    <>
      <Header />
      <div className="form-group selectClass" style={{ width: "100%" }}>
        <div className="select-wrapper">
          <div
            className="select-button"
            onClick={() => {
              document
                .querySelector(".select-wrapper")
                .classList.toggle("active");
            }}
            onBlur={() => {
              document
                .querySelector(".select-wrapper")
                .classList.toggle("active");
            }}
          >
            <div className="select-button-text">{Option}</div>
            <i className="bx bx-chevron-down">
              <ChevronDownIcon />
            </i>
          </div>

          <ul className="options">
            {allOptions.map((ele, index) => {
              return (
                <div
                  className="option"
                  onClick={(e) => {
                    handleUserTypeChange(e);
                  }}
                  key={index}
                >
                  <p className="option-text">{ele}</p>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
      {!Class ? (
        <div></div>
      ) : (
        <div style={{ padding: "3rem" }}>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "100vh",
                width: "100%",
              }}
            >
              <BeatLoader
                color="#1A2B40"
                size={18}
                margin={2}
                loading={loading}
              />
            </div>
          ) : (
            <Table>
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Notice On</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {notices &&
                  notices.map((notice, index) => (
                    <Tr key={index}>
                      <Td>{notice.date}</Td>
                      <Td>{notice.noticeOn}</Td>
                      <Td style={{ display: "flex", gap: ".5rem" }}>
                        <Button
                          colorScheme="blue"
                          onClick={() => {
                            window.localStorage.setItem(
                              "selectedNotice",
                              JSON.stringify(notice)
                            );
                            window.location.href = "/GeneratedNotice";
                          }}
                        >
                          View Details
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => {
                            setIsOpen(true);
                            setSelectedNotice(notice);
                          }}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          )}
        </div>
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
              <Button colorScheme="green" onClick={handleNoticeDelete} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default GeneratedNotices;
