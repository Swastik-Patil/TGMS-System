import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/CCHome.css";
import Header from "../../components/Header";
import { ChevronDownIcon } from "../../utils/ChevronDownIcon";
import {
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
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import {
  update,
  ref as dbRef,
  getDatabase,
  get,
  child,
} from "firebase/database";
import { useAuth } from "../../contexts/AuthContext";

function AdminHome() {
  const { currentUser } = useAuth();
  const toast = useToast();
  const OverlayOne = () => <ModalOverlay backdropFilter="blur(10px)" />;
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const {
    isOpen: isOpen3,
    onOpen: onOpen3,
    onClose: onClose3,
  } = useDisclosure();
  const [ccClass, setccClass] = useState("Select Class");
  const [Option, setOption] = useState(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  function getGeneratedNotices() {}

  function handleUserTypeChange(e) {
    setccClass(e.target.outerText);
    document.querySelector(".select-wrapper").classList.toggle("active");
  }

  function saveCC() {
    let div = ccClass.replace(/\s+/g, "");
    const db = getDatabase();
    update(dbRef(db, "CCData/" + nameRef.current?.value + "/"), {
      name: nameRef.current?.value,
      class: div,
      email: emailRef.current?.value,
    }).then(() => {
      onClose1();
      toast({
        position: "top-right",
        description: "CC Added Successfully",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    });
  }
  function saveTGC() {
    const db = getDatabase();
    update(dbRef(db, "TGCData/" + nameRef.current?.value + "/"), {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
    }).then(() => {
      onClose2();
      toast({
        position: "top-right",
        description: "TG Coordinator Added Successfully",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    });
  }
  function saveTTC() {
    const db = getDatabase();
    update(dbRef(db, "TTCData/" + nameRef.current?.value + "/"), {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
    }).then(() => {
      onClose3();
      toast({
        position: "top-right",
        description: "TT Coordinator Added Successfully",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    });
  }

  async function getAvailableClasses() {
    const db = dbRef(getDatabase());
    try {
      const snapshot = await get(child(db, "/CCData/"));
      if (snapshot.exists()) {
        let data = snapshot.val();
        window.localStorage.setItem("CCData", JSON.stringify(data));
        data = Object.keys(data).map((key) => data[key]);
        data = data.map((ele) => {
          return (
            String(ele.class).slice(0, -1) + " " + String(ele.class).slice(-1)
          );
        });
        let allOptions = [
          "SE A",
          "SE B",
          "SE C",
          "TE A",
          "TE C",
          "BE A",
          "BE C",
        ];
        allOptions = allOptions.filter((option) => !data.includes(option));
        setOption(allOptions);
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAvailableClasses();
  }, []);

  return (
    <div className="frame" style={{ flexDirection: "column" }}>
      <Header />
      <div
        className="div-2"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="div-3" style={{ display: "flex", width: "70%" }}>
          <div
            onClick={onOpen1}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div className="overlap">
              <div
                className="rectangle"
                style={{
                  flexDirection: "column",
                  height: "150px",
                  width: "250px",
                }}
              >
                <div className="text-wrapper">Add New CC</div>
              </div>
            </div>
          </div>
          <div
            onClick={onOpen2}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div className="overlap">
              <div
                className="rectangle"
                style={{
                  flexDirection: "column",
                  height: "150px",
                  width: "250px",
                }}
              >
                <div className="text-wrapper">Add New TGC</div>
              </div>
            </div>
          </div>
          <div
            onClick={onOpen3}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div className="overlap">
              <div
                className="rectangle"
                style={{
                  flexDirection: "column",
                  height: "150px",
                  width: "250px",
                }}
              >
                <div className="text-wrapper">Add New TTC</div>
              </div>
            </div>
          </div>
          <Link
            to="ManagePage"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div className="overlap">
              <div
                className="rectangle"
                style={{
                  flexDirection: "column",
                  height: "150px",
                  width: "250px",
                }}
              >
                <div className="text-wrapper">Manage Accounts</div>
              </div>
            </div>
          </Link>
          <div
            onClick={getGeneratedNotices}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div className="overlap">
              <div
                className="rectangle"
                style={{
                  flexDirection: "column",
                  height: "150px",
                  width: "250px",
                }}
              >
                <div className="text-wrapper">Generated Notice</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        initialFocusRef={nameRef}
        isOpen={isOpen1}
        onClose={onClose1}
        motionPreset="slideInBottom"
      >
        <OverlayOne />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input ref={nameRef} placeholder="First and Last Name" />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input ref={emailRef} placeholder="Enter Email" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Class</FormLabel>
              <div className="form-group" style={{ width: "100%" }}>
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
                    <div className="select-button-text">{ccClass}</div>
                    <i className="bx bx-chevron-down">
                      <ChevronDownIcon />
                    </i>
                  </div>

                  <ul className="options">
                    {Option &&
                      Option.map((ele, index) => {
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
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={saveCC}>
              Save
            </Button>
            <Button onClick={onClose1}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        initialFocusRef={nameRef}
        isOpen={isOpen2}
        onClose={onClose2}
        motionPreset="slideInBottom"
      >
        <OverlayOne />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input ref={nameRef} placeholder="First and Last Name" />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input ref={emailRef} placeholder="Enter Email" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={saveTGC}>
              Save
            </Button>
            <Button onClick={onClose2}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        initialFocusRef={nameRef}
        isOpen={isOpen3}
        onClose={onClose3}
        motionPreset="slideInBottom"
      >
        <OverlayOne />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input ref={nameRef} placeholder="First and Last Name" />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input ref={emailRef} placeholder="Enter Email" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={saveTTC}>
              Save
            </Button>
            <Button onClick={onClose3}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AdminHome;
