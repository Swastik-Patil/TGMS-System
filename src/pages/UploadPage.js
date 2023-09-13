import React, { useState, useEffect } from "react";
import "../styles/UploadPage.css";
import Header from "../components/Header";
import * as XLSX from "xlsx";
import { Button } from "@chakra-ui/react";
import { ref as dbref, update } from "firebase/database";
import { database } from "../utils/init-firebase";
import { useAuth } from "../contexts/AuthContext";
import styled from "styled-components";

export const UploadPage = () => {
  const [loading, setLoading] = useState(true);
  const [excelFile, setExcelFile] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    showLoading();
  });

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFile(null);
      }
    } else {
      alert("Please select your file");
    }
  };

  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      const dataToSend = data.map((item) => {
        item.dateOfAdmission = String(item.dateOfAdmission)
          .replaceAll("-", ".")
          .replaceAll("/", ".");

        item.dateOfBirth = String(item.dateOfBirth)
          .replaceAll("-", ".")
          .replaceAll("/", ".");

        return {
          ...item,
        };
      });
      document.getElementById("status").style.display = "block";
      setExcelFile(dataToSend);
      const db = database;
      let len = 0,
        size = data.length;
      data.forEach((ele) => {
        const IDRef = ele.enrollNo;
        const registerStatus = {
          isRegistered: false,
        };
        update(dbref(db, "/orgData/" + IDRef), {
          ...ele,
          registerStatus: registerStatus,
        }).then((snapshot) => {
          len += 1;
          document.getElementById(
            "status"
          ).innerText = `${len} out of ${size} data uploaded`;
          // console.log(`${len} out of ${size} data uploaded`);
          if (len >= size)
            document.getElementById("status").innerText =
              "Uploaded Successfully";
        });
      });
    } else {
      alert("Empty file not allowed");
    }
  };

  function showLoading() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  return (
    <>
      <Header />
      <Container>
        <Holder>
          <Instructions>
            <b style={{ marginBottom: "10px", fontSize: "19px" }}>
              Instructions
            </b>
            <ol>
              <li>Create Excel file with extension (.xls or .xlsx)</li>
              <li>
                Download the template for filling data from here :{" "}
                <a
                  style={{ color: "blue" }}
                  href="https://docs.google.com/spreadsheets/d/1FraYcIGRoTIrRTCKZFQbPofmfxOS3FfE/edit?usp=sharing&ouid=109387194985691076986&rtpof=true&sd=true"
                  target="_blank"
                  rel={"noreferrer"}
                >
                  View Now
                </a>
              </li>
              <li>
                Choose that excel file after filling data of all students and
                click on submit
              </li>
              <li>
                Refresh Page to upload another file after uploading one file
              </li>
            </ol>
          </Instructions>
          <form id="excelForm" onSubmit={handleSubmit}>
            <input
              type="file"
              onChange={handleFile}
              id="inputFile"
              accept=".xls,.xlsx"
              style={{
                border: "1px solid black",
                margin: "0px 20px",
                borderRadius: "5px",
              }}
              required
            />

            <Button colorScheme={"blue"} type="submit">
              submit
            </Button>
            <h3
              style={{
                paddingLeft: "50px",
                paddingTop: "25px",
                color: "green",
                fontWeight: "bold",
                display: "none",
              }}
              id="status"
            >
              Uploading data... Please wait
            </h3>
          </form>
        </Holder>
      </Container>
    </>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Holder = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid grey;
  border-radius: 12px;
  justify-content: center;
  height: 450px;
  background-color: whitesmoke;
  z-index: 0;

  @media (max-width: 650px) {
    height: 520px;
  }
`;
const Instructions = styled.div`
  width: 60%;
  box-shadow: 2px 2px 3px grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 2px solid grey;
  border-radius: 12px;
  font-family: sans-serif;
  gap: 10px;
  justify-content: center;
  height: 350px;
  background-color: white;
  z-index: 0;
  margin: 20px;

  @media (max-width: 650px) {
    height: 520px;
  }
`;
export default UploadPage;
