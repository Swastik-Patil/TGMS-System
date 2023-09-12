import React, { useState } from "react";
import {
  ref as dbref,
  remove,
  update,
  push,
  set,
  get,
  child,
} from "firebase/database";
import { database } from "../utils/init-firebase";
import styled from "styled-components";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { updateAccepted, updateRejected } from "../utils/Info-funtions";

function ActionControlPanel({
  ele,
  fullNameModified,
  dateOfBirthModified,
  rollNoModified,
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const [isOpen2, setIsOpen2] = React.useState(false);
  const onClose2 = () => setIsOpen2(false);
  const cancelRef2 = React.useRef();

  const [isOpen3, setIsOpen3] = React.useState(false);
  const onClose3 = () => setIsOpen3(false);
  const cancelRef3 = React.useRef();

  const [IP, setIP] = useState(null);
  const [validityDate, setValidityDate] = React.useState("");

  function handleReject() {
    getIpaddress();
    let remark = String(document.getElementById("remark").value);
    onClose(true);
    if (remark.length > 0) {
      rejectStudent(remark);
    } else alert("Empty Remark found !");
  }

  function handleApprove() {
    getIpaddress();
    if (validityDate) {
      approveStudent("Approved");
    } else {
      alert("Add Certificate Validity date");
    }
  }

  function rejectStudent(remark) {
    if (ele) {
      const IDRef = ele.uid;
      const db = database;
      if (!ele.isRejected || !ele.isApproved) {
        ele.isPending = false;
        ele.isRejected = true;
        updateRejected(new String(ele.branch));
        let date = new Date(Date.now());
        set(dbref(db, "/users/" + IDRef), {
          ...ele,
          fullName: fullNameModified,
          dateOfBirth: dateOfBirthModified,
          rollNo: rollNoModified,
          remark: remark,
          actionDate:
            date.getDate() +
            "/" +
            parseInt(date.getMonth() + 1) +
            "/" +
            date.getFullYear(),
        });

        const newEle = {
          ...ele,
          fullName: fullNameModified,
          dateOfBirth: dateOfBirthModified,
          rollNo: rollNoModified,
          HODIP: IP,
          remark: remark,
          actionDate:
            date.getDate() +
            "/" +
            parseInt(date.getMonth() + 1) +
            "/" +
            date.getFullYear(),
        };

        const newRef = push(dbref(db, "/history/rejected/" + IDRef));
        set(newRef, {
          ...newEle,
        });
      } else {
        alert("already approved or rejected");
      }
    }
  }
  function approveStudent(remark) {
    if (ele) {
      const IDRef = ele.uid;
      const db = database;
      let date = new Date(Date.now());
      if (!ele.isRejected || !ele.isApproved) {
        ele.isPending = false;
        ele.isApproved = true;
        set(dbref(db, "/users/" + IDRef), {
          ...ele,
        });

        // getting unique bonafide number
        get(child(dbref(db), `/info/${ele.branch}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              let data = snapshot.val();
              console.log(data);
              let bonafide_no = data.accepted + 1;
              if (bonafide_no > 999) {
                bonafide_no = 1;
                update(dbref(db, `/info/${ele.branch}/`), {
                  accepted: 1,
                });
              }
              update(dbref(db, "/history/approved/" + IDRef), {
                ...ele,
                fullName: fullNameModified,
                dateOfBirth: dateOfBirthModified,
                rollNo: rollNoModified,
                validityDate: validityDate,
                HODIP: IP,
                remark: remark,
                bonafide_no: bonafide_no,
                lastApprovedDate: new Date(Date.now()),
                actionDate:
                  date.getDate() +
                  "/" +
                  parseInt(date.getMonth() + 1) +
                  "/" +
                  date.getFullYear(),
              });
              updateAccepted(ele.branch);
              deleteUserData(ele);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  function deleteUserData(ele) {
    if (ele) {
      const IDRef = ele.uid;
      const db = database;
      remove(dbref(db, "/users/" + IDRef))
        .then(() => {
          // console.log("Deleted user data");
        })
        .catch((error) => {
          // console.log("unsuccessful, error " + error);
        });
    }
  }

  function getIpaddress() {
    fetch("https://jsonip.com/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIP(data.ip);
        // console.log(data.ip);
      })
      .catch((err) => {
        // console.log(`There was an error ${err}`);
      });
  }

  return (
    <Contain>
      <Button
        onClick={() => {
          if (
            String(fullNameModified).length != 0 &&
            String(rollNoModified).length != 0 &&
            String(dateOfBirthModified).length != 0
          )
            setIsOpen2(true);
          else setIsOpen3(true);
        }}
        colorScheme={"green"}
      >
        Approve
      </Button>
      <Button
        onClick={() => {
          if (
            String(fullNameModified).length != 0 &&
            String(rollNoModified).length != 0 &&
            String(dateOfBirthModified).length != 0
          )
            setIsOpen(true);
          else setIsOpen3(true);
        }}
        colorScheme={"red"}
      >
        Reject
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remark for Rejecting Application
            </AlertDialogHeader>

            <AlertDialogBody>
              <form id="remarkForm">
                <textarea
                  style={{ border: "1px solid black", borderRadius: "5px" }}
                  rows="4"
                  cols="45"
                  id="remark"
                  form="remarkForm"
                  required
                ></textarea>
              </form>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={handleReject} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        isOpen={isOpen2}
        leastDestructiveRef={cancelRef2}
        onClose={onClose2}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Until what date is this certificate valid :
            </AlertDialogHeader>

            <AlertDialogBody>
              <form id="validity">
                <input
                  type={"date"}
                  style={{ border: "1px solid black", borderRadius: "5px" }}
                  id="validity"
                  value={validityDate}
                  onChange={(e) => setValidityDate(e.target.value)}
                  form="validity"
                  required
                />
              </form>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="red" onClick={onClose2} ml={3}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={handleApprove} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        isOpen={isOpen3}
        leastDestructiveRef={cancelRef3}
        onClose={onClose3}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Error !
            </AlertDialogHeader>

            <AlertDialogBody>
              Please fill all the empty fields !
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="red" onClick={onClose3} ml={3}>
                Okay
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Contain>
  );
}

export default ActionControlPanel;

const Contain = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding: 5px;
`;
