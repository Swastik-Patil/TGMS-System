import React, { useState, useEffect } from "react";
import styled from "styled-components";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  Textarea,
} from "@chakra-ui/react";
import { ref, getDatabase, set, child, get } from "firebase/database";
import { database } from "../../utils/init-firebase";

function ContactTg() {
  const [currUID, setCurrUID] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [mailSubjects, setMailSubjects] = useState([]);
  const [TGName, setTGName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
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

  useEffect(() => {
    const IDRef = window.sessionStorage.getItem("selectedStudent");
    setCurrUID(IDRef);
  }, []);

  useEffect(() => {
    const fetchMailSubjects = async () => {
      try {
        const dbRef = ref(database, `StudentsData/${currUID}/mails`);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const subjects = [];
          snapshot.forEach((childSnapshot) => {
            const mailData = childSnapshot.val();
            subjects.push({
              id: childSnapshot.key,
              subject: mailData.subject,
              message: mailData.message,
            });
          });
          setMailSubjects(subjects);
          const dbRef1 = ref(database, `StudentsData/${currUID}/tg`);
          const snapshot1 = await get(dbRef1);
          if (snapshot1.exists()) {
            const data = snapshot1.val();
            setTGName(data);
          }
        }
      } catch (error) {
        console.error("Error fetching mail subjects: ", error);
      }
    };
    fetchMailSubjects();
  }, [currUID]);

  function handleDetails(mailId) {
    const selectedMail = mailSubjects.find((mail) => mail.id === mailId);
    if (selectedMail) {
      setSubject(selectedMail.subject);
      setMessage(selectedMail.message);
      onOpen2();
    }
  }

  function composeEmail() {
    const dbRef = ref(getDatabase());
    let str = `https://mail.google.com/mail/?view=cm&fs=1&`;
    get(child(dbRef, "/TGData/" + TGName + "/email"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          str += `to=${data}&`;
        } else {
          console.log("No email addresses available");
        }

        str += `su=${subject}&body=${message}`;
        window.open(str);
        // window.location.href = str;
      })
      .catch((error) => {
        console.error("Error fetching email addresses: ", error);
      });
  }

  const handleSendEmail = () => {
    if (subject.trim() !== "" && message.trim() !== "") {
      addMails();
    } else {
      alert("Please fill in both subject and message fields.");
    }
  };

  function addMails() {
    if (subject.trim() !== "" && message.trim() !== "") {
      const dbRef = ref(getDatabase());

      get(child(dbRef, `StudentsData/${currUID}/emailCounter`))
        .then((snapshot) => {
          let emailCounter = 0;
          if (snapshot.exists()) {
            emailCounter = snapshot.val();
          }
          emailCounter++;
          const mailId = "Mail_" + emailCounter;
          const newMailRef = child(
            dbRef,
            `StudentsData/${currUID}/mails/${mailId}`
          );

          set(newMailRef, {
            mailId: mailId,
            subject: subject,
            message: message,
          })
            .then(() => {
              set(
                child(dbRef, `StudentsData/${currUID}/emailCounter`),
                emailCounter
              );

              onClose1();
              composeEmail();
            })
            .catch((error) => {
              console.error("Error adding mail to Firebase: ", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching email counter: ", error);
        });
    }
  }

  const columns = [
    {
      key: "SrNo",
      label: "Sr. No.",
    },
    {
      key: "subject",
      label: "Subject",
    },
    {
      key: "actions",
      label: "Actions",
    },
  ];

  const navItems = [
    {
      label: "Home",
      href: "home",
    },
    {
      label: "Upload Certificates",
      href: "uploadCertificate",
    },
    {
      label: "Uploaded Certificates",
      href: "uploadedCertificates",
    },
    {
      label: "Contact TG",
      href: "contactTg",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Header navItems={navItems} />
      <TableParent style={{ width: "100%" }}>
        <div className="flex flex-col gap-4">
          <div style={{ display: "flex", gap: "1rem" }}>
            <Input
              className="w-full sm:max-w-[44%]"
              placeholder="Search by Subject of mail"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />
            <div style={{ flex: 1 }}>
              <Button
                colorScheme="blue"
                p={4}
                onClick={() => {
                  onOpen1();
                }}
              >
                Compose Mail
              </Button>
            </div>
          </div>
        </div>
        <TableContainer>
          <Table id="myTable1" variant="simple">
            <TableCaption>TG Contact History</TableCaption>
            <Thead>
              <Tr>
                {columns.map((ele) => (
                  <Th key={ele.key}>{ele.label}</Th>
                ))}
              </Tr>
            </Thead>

            <Tbody>
              {mailSubjects
                .filter((mail) =>
                  mail.subject.toLowerCase().includes(searchTerm)
                )
                .map((mail, index) => (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{mail.subject}</Td>
                    <Td style={{ display: "flex", gap: ".5rem" }}>
                      <Button
                        colorScheme="blue"
                        onClick={() => handleDetails(mail.id)}
                      >
                        View Mails
                      </Button>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </TableParent>

      <Modal isOpen={isOpen1} onClose={onClose1} motionPreset="slideInBottom">
        <ModalContent>
          <ModalHeader>Compose Mail</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={3}>
            <FormControl>
              <Textarea
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSendEmail}>
              Send Mail
            </Button>
            <Button onClick={onClose1}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen2} onClose={onClose2} motionPreset="slideInBottom">
        <OverlayOne />
        <ModalContent>
          <ModalHeader>Mail Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MailCard>
              <Subject>{subject}</Subject>
              <Message>{message}</Message>
            </MailCard>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

const TableParent = styled.div`
  padding: 1rem;
`;

const MailCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const Subject = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Message = styled.div`
  margin-bottom: 10px;
`;

export default ContactTg;
