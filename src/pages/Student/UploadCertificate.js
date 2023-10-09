import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, database } from "../../utils/init-firebase";
import { ref as Ref, update } from "firebase/database";
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
} from "@chakra-ui/react";

export default function UploadCertificate({ data }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [certType, setCertType] = useState("course");
  const [completionDate, setCompletionDate] = useState("");
  const { currentUser } = useAuth();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDateChange = (e) => {
    setCompletionDate(e.target.value);
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (fileName === null || certType === null || !file) {
      alert("Fill all the Details");
    } else {
      document.getElementById("uploadButton").disabled = true;
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
    document.getElementById("uploadButton").innerHTML = `Finishing Up`;

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
        alert("Certificate Uploaded Successfully");
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
          p={"8"}
          boxShadow={{ md: "2px 3px 12px", base: "2px 2px 6px" }}
          rounded={{ sm: "lg" }}
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
                <Radio value="course">Course</Radio>
                <Radio value="internship">Internship</Radio>
                <Radio value="event">Event</Radio>
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
