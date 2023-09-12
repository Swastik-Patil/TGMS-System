import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { storage, database } from "../utils/init-firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { set, ref as dbref } from "firebase/database";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

function Signature({ path_id, data, principalSign }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const [file, setFile] = useState(null);

  function visitBonafidePreview() {
    window.localStorage.setItem("Clerk_Sign", path_id);
    window.location.href = "/sampleBonafide";
  }

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      for (let i = 0; i <= e.target.files.length - 1; i++) {
        setFile(e.target.files[0]);
      }
    }
  };

  const handleSubmit = (downloadURL) => {
    const db = database;

    set(dbref(db, "/signatures/" + path_id), {
      name: document.getElementById("name").value,
      sign: downloadURL,
    });
    document.getElementById("uploadButton").innerHTML = `Updated Successfully`;
    // console.log("Submitted");
    onClose();
    window.location.href = "/HODSignature";
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!document.getElementById("name").value || !file) {
      document.getElementById("heading").innerHTML =
        "Empty fields not allowed !";
      document.getElementById("heading").style = "color:red;";
    } else {
      document.getElementById("uploadButton").innerHTML =
        "Submitting... Please Wait";
      document.getElementById("uploadButton").disabled = true;
      let typeRef = "SIGNATURES";
      const pathRef = path_id;
      let storageRef = ref(storage, `${pathRef}/${typeRef}/${file.name}`);
      let uploadTask = uploadBytesResumable(storageRef, file);
      // console.log("Uploaded");

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log("Upload is " + progress + "% done");
          progress.toPrecision(2);
          document.getElementById(
            "uploadButton"
          ).innerHTML = `Uploading... ${parseInt(progress)}%`;
          switch (snapshot.state) {
            case "paused":
              // console.log("Upload is paused");
              break;
            case "running":
              // console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          alert("Some error occured ! Please try again");
        },
        () => {
          document.getElementById("uploadButton").innerHTML = `Submitting...`;
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            handleSubmit(downloadURL);
          });
        }
      );
    }
  };

  function getPostFromAbbrevation(abrev) {
    switch (abrev) {
      case "CM":
        return "Computer Technology";
        break;
      case "CE":
        return "Civil Engineering";
        break;
      case "ME":
        return "Mechanical Engineering";
        break;
      case "CH":
        return "Chemical Engineering";
        break;
      case "IC":
        return "Instrumentation & Control Engineering";
        break;
      case "PR":
        return " Government Polytechnic Pen";
        break;
      default:
        return "Department not found";
    }
  }

  return (
    <Content>
      <Wrap>
        <a href={data ? data.sign : ""} target="_blank">
          <img height={120} width={200} src={data ? data.sign : ""} alt="" />
        </a>
      </Wrap>
      <Info>
        <span>{data ? data.name : ""}</span>
        <span style={{ fontSize: "12px;" }}>
          {path_id == "PR" ? "Principal" : "HOD"}
        </span>
        <span style={{ fontStyle: "italic" }}>
          {getPostFromAbbrevation(path_id)}
        </span>
      </Info>
      <Wrap>
        <Wrap2>
          <BTN2 onClick={visitBonafidePreview}>Preview</BTN2>
          <BTN2
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Modify
          </BTN2>
        </Wrap2>
      </Wrap>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <span id="heading">Modify Details</span>
            </AlertDialogHeader>

            <AlertDialogBody>
              <form>
                <div className="mb-3">
                  <label for="name" className="form-label">
                    Full Name specified with (Mr. / Mrs.)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label for="signature" className="form-label">
                    Upload signature image
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="form-control"
                    id="signature"
                  />
                </div>
              </form>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                colorScheme="green"
                id="uploadButton"
                onClick={handleUpload}
                ml={3}
              >
                Update
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Content>
  );
}

export default Signature;

const Content = styled.div`
  display: flex;
  background: #ffff;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  border: 0.8px solid grey;
  width: auto;
  border-radius: 10px;
`;
const Info = styled.div`
  display: flex;
  font-size: 18px;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
`;
const Wrap = styled.div`
  display: flex;
  margin: 10px;
  height: 150px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
`;

const BTN2 = styled.button`
  background-color: #440d89;
  color: white;
  padding: 5px 15px;
  border: 2px solid #100d89;
  border-radius: 5px;
  margin: 0px 20px;
  transition: 150ms all;
  :hover {
    background-color: black;
  }
`;
const Wrap2 = styled.div`
  display: flex;
  flex-direction: column;
  gap 10px; 
`;
