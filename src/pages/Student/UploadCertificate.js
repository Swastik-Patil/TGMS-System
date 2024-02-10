import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, database } from "../../utils/init-firebase";
import { ref as Ref, child, get, update, getDatabase } from "firebase/database";
import Header from "../../components/Header";
import {
  RadioGroup,
  Radio,
  HStack,
  Stack,
  Button,
  Input,
  Box,
  Text,
  useToast,
} from "@chakra-ui/react";
import { createWorker } from "tesseract.js";

export default function UploadCertificate({ data }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [certType, setCertType] = useState("course");
  const [completionDate, setCompletionDate] = useState("");
  const { currentUser } = useAuth();
  const toast = useToast();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFile(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDateChange = (e) => {
    setCompletionDate(e.target.value);
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const validCertificates = [
    "International",
    "National",
    "State",
    "Internship",
    "Course",
    "Participation",
  ]; // Add your valid certificate names here

  const points = {
    International: 4,
    National: 3,
    State: 2,
    Internship: 2,
    Course: 1,
    Participation: 1,
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (fileName === null || certType === null || !file) {
      toast({
        position: "top-right",
        description: "Fill all the Details.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      document.getElementById("uploadButton").disabled = true;
      document.getElementById(
        "uploadButton"
      ).innerHTML = `<div class="spinner-border spinner-border-sm" role="status"></div>`;

      const worker = await createWorker("eng");
      const ret = await worker.recognize(file);
      const detected = validCertificates.filter((certificate) =>
        String(ret.data.text)
          .toLowerCase()
          .includes(String(certificate).toLowerCase())
      );

      if (!detected.includes(certType)) {
        alert("Upload Correct Document of course");
        document.getElementById("uploadButton").innerHTML = `Submit`;
        document.getElementById("uploadButton").disabled = false;
        return;
      }

      let point = points[detected[0]];
      detected.forEach((cert) => {
        if (cert === "winner") {
          point += 1;
        }
      });

      const db = database;
      const IDRef = window.sessionStorage.getItem("selectedStudent");
      if (!IDRef) window.location.href = "/home";
      get(child(Ref(db), `StudentsData/${IDRef}/points`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            data = snapshot.val();
            point += data;

            if (point > 5) {
              update(Ref(db, `StudentsData/${IDRef}`), {
                points: point,
                studentType: "Advance",
              });
            } else {
              update(Ref(db, `StudentsData/${IDRef}`), {
                points: point,
              });
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });

      let data = JSON.parse(localStorage.getItem("data"));
      let storageRef = ref(
        storage,
        `Certificates/${data[0].admissionNo}/${certType}/${file.name}`
      );
      let uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on("state_changed", () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURLBC) => {
          handleSubmit(downloadURLBC);
        });
      });
    }
  };

  const handleSubmit = (downloadURLBC) => {
    let data = JSON.parse(localStorage.getItem("data"));
    const db = database;
    update(
      Ref(
        db,
        "/StudentsData/" + data[0].admissionNo + "/certificateList/" + fileName
      ),
      {
        name: fileName,
        downloadURL: downloadURLBC,
        fileName: file.name,
        uploadedOn: String(new Date()),
        completionDate: completionDate,
        certificateType: certType,
      }
    )
      .then(() => {
        toast({
          position: "top-right",
          description: "Uploaded Successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        document.getElementById("uploadButton").innerHTML = `Submit`;
        document.getElementById("uploadButton").disabled = false;
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-3 max-w-lg ">
      <Header navItems={navItems} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          bg={"white"}
          p={{ sm: "2", md: "6", lg: "8" }}
          boxShadow={{ md: "2px 3px 12px", base: "2px 2px 6px" }}
          rounded={"lg"}
        >
          <HStack p={"2"}>
            <Text>Certificate Title : </Text>
            <Input
              width="auto"
              isRequired
              type="text"
              placeholder="Enter Certificate Name"
              id="certificateTitle"
              value={fileName}
              onChange={handleFileNameChange}
            />
          </HStack>
          <HStack p={"2"}>
            <Text>Certificate Type : </Text>
            <RadioGroup onChange={setCertType} value={certType}>
              <Stack direction="row">
                <Radio value="Course">Course</Radio>
                <Radio value="Internship">Internship</Radio>
                <Radio value="Event">Event</Radio>
              </Stack>
            </RadioGroup>
          </HStack>
          <HStack p={"2"}>
            <Text>Completion Date : </Text>
            <Input
              width="auto"
              isRequired
              type="date"
              placeholder="Completion Date"
              value={completionDate}
              onChange={handleDateChange}
            />
          </HStack>
          <HStack p={"2"}>
            <Input
              type="file"
              isRequired
              width="auto"
              style={{ padding: "5px" }}
              onChange={handleFileChange}
            />
          </HStack>
          <HStack pt={"4"} display={"flex"} justifyContent={"center"}>
            <Button colorScheme="blue" id="uploadButton" onClick={handleUpload}>
              Submit
            </Button>
          </HStack>
        </Box>
      </div>
    </div>
  );
}
