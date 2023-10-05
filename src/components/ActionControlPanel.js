import React from "react";
import { ref as dbref, set } from "firebase/database";
import { database } from "../utils/init-firebase";
import styled from "styled-components";
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

function ActionControlPanel({ ele }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const [isOpen2, setIsOpen2] = React.useState(false);
  const onClose2 = () => setIsOpen2(false);
  const cancelRef2 = React.useRef();

  function handleSlowLearner() {
    onClose(true);
    rejectStudent();
  }

  function handleAdvanceLearner() {
    onClose2(true);
    approveStudent("Approved");
  }

  async function rejectStudent() {
    let data = ele;
    data["studentType"] = "Slow";
    set(dbref(database, `StudentsData/${data.admissionNo}`), data);
  }

  function approveStudent() {
    let data = ele;
    data["studentType"] = "Advance";
    set(dbref(database, `StudentsData/${data.admissionNo}`), data);
  }

  return (
    <Contain>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
        isDisabled={ele.studentType === "Slow" ? true : false}
        colorScheme={"red"}
      >
        Add to Slow Learner
      </Button>
      <Button
        onClick={() => {
          setIsOpen2(true);
        }}
        isDisabled={ele.studentType === "Advance" ? true : false}
        colorScheme={"green"}
      >
        Add to Advance Learner
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Click confirm for adding in slow learners.
            </AlertDialogHeader>

            <AlertDialogFooter>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={handleSlowLearner} ml={3}>
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
              Click confirm for adding in advance learners.
            </AlertDialogHeader>

            <AlertDialogFooter>
              <Button colorScheme="red" onClick={onClose2} ml={3}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={handleAdvanceLearner} ml={3}>
                Confirm
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
