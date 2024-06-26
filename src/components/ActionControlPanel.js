import React, { useEffect } from "react";
import { ref as dbref, remove, set, child } from "firebase/database";
import { database } from "../utils/init-firebase";
import styled from "styled-components";
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import youtube from "../api/youtube";
import dotenv from "dotenv";

function ActionControlPanel({ ele }) {
  useEffect(() => {
    dotenv.config();
  }, []);

  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const [isOpen2, setIsOpen2] = React.useState(false);
  const onClose2 = () => setIsOpen2(false);
  const cancelRef2 = React.useRef();

  const OverlayOne = () => <ModalOverlay backdropFilter="blur(10px)" />;
  const {
    isOpen: isOpen3,
    onOpen: onOpen3,
    onClose: onClose3,
  } = useDisclosure();
  const observationsRef = React.useRef();

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

  const [loading, setLoading] = React.useState(false);
  async function addNewObservations() {
    let currUID = ele.admissionNo;
    setLoading(true);
    if ((observationsRef.current?.value).trim() !== "") {
      let observations = (observationsRef.current?.value).toLowerCase();

      await youtube
        .get("/search", {
          params: {
            q: observations,
            part: "snippet",
            maxResults: 3,
            type: "video",
            key: "AIzaSyC6is0G0DZui1TsfTdDwxt3qhaFby7kmgk",
          },
        })
        .then((response) => {
          if (response.data.items.length > 0) {
            set(
              dbref(
                database,
                `StudentsData/${currUID}/facultyObservations/${observationsRef.current?.value}`
              ),
              {
                observations: observationsRef.current?.value,
                resources: response.data.items,
              }
            ).then(() => {
              onClose3();
              window.location.reload();
            });
          }
        });
    }
    // Remove loading spinner
    setLoading(false);
  }

  function deleteObservations(key) {
    remove(
      child(
        dbref(database),
        `StudentsData/${ele.admissionNo}/facultyObservations/${key}`
      )
    ).then(() => {
      onClose3();
      window.location.reload();
    });
  }

  return (
    <Contain>
      <Button onClick={onOpen3} colorScheme={"blue"}>
        Update Observations
      </Button>
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

      <Modal
        initialFocusRef={observationsRef}
        isOpen={isOpen3}
        onClose={onClose3}
        motionPreset="slideInBottom"
      >
        <OverlayOne />
        <ModalContent>
          <ModalHeader>Faculty Observations</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel> Current Observations</FormLabel>
              {ele.facultyObservations
                ? Object.keys(ele.facultyObservations).map((key, index) => {
                    return (
                      <p
                        style={{
                          paddingBlock: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          fontSize: "medium",
                          fontWeight: "normal",
                        }}
                        key={index}
                      >
                        {key}{" "}
                        <Button
                          colorScheme="red"
                          mr={3}
                          onClick={() => deleteObservations(key)}
                        >
                          Delete
                        </Button>{" "}
                      </p>
                    );
                  })
                : "No Current Observations"}

              <Textarea placeholder="Observations" ref={observationsRef} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={addNewObservations}
              isDisabled={loading}
            >
              {loading ? "Processing..." : "Save"}
            </Button>
            <Button onClick={onClose3} isDisabled={loading}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
