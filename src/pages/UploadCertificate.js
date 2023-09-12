import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Route, Link } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, database } from "../utils/init-firebase";
import { getDatabase, ref as Ref, child, get, update } from "firebase/database";
import Header from "../components/Header";
import { RadioGroup, Radio, Stack, Button, Input } from "@chakra-ui/react";

export default function UploadCertificate({ data }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [certType, setCertType] = useState("course");
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (fileName === null || certType === null || !file) {
      setIsOpen(true);
    } else {
      document.getElementById("uploadButton").disabled = true;
      const pathRef = currentUser.uid;
      let storageRef = ref(
        storage,
        `Certificates/${pathRef}/${certType}/${file.name}`
      );
      let uploadTask = uploadBytesResumable(storageRef, file);
      console.log(uploadTask);
      uploadTask.on("state_changed", () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURLBC) => {
          handleSubmit(downloadURLBC);
        });
      });
    }
  };

  const handleSubmit = (downloadURLBC) => {
    let d = data.filter((ele) => {
      return ele.email === currentUser.email;
    });

    document.getElementById("uploadButton").innerHTML = `Finishing Up`;

    const db = database;
    update(
      Ref(
        db,
        "/StudentsData/" + d[0].admissionNo + "/certificateList/" + fileName
      ),
      {
        name: fileName,
        downloadURL: downloadURLBC,
      }
    );
  };
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
        <Input
          width="auto"
          isRequired
          type="text"
          placeholder="Enter Certificate Name"
          id="certificateTitle"
          onChange={handleFileNameChange}
        />

        <RadioGroup onChange={setCertType} value={certType}>
          <Stack direction="row">
            <Radio value="course">Course</Radio>
            <Radio value="internship">Internship</Radio>
          </Stack>
        </RadioGroup>

        <Input
          type="file"
          isRequired
          width="auto"
          style={{ padding: "5px" }}
          onChange={handleFileChange}
          placeholder="Enter Certificate Name"
        />
        <br />
        <Button colorScheme="blue" id="uploadButton" onClick={handleUpload}>
          Submit
        </Button>
      </div>
    </div>
  );
}
