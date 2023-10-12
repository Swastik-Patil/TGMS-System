import React, { useState } from "react";
import * as XLSX from "xlsx";
import { ref as dbref, update } from "firebase/database";
import { database } from "../utils/init-firebase";
import styled from "styled-components";

function UploadStudentData() {
  const [excelFile, setExcelFile] = useState(null);

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
      document.getElementById("status").style.display = "block";
      setExcelFile(data);
      const db = database;
      let len = 0,
        size = data.length;
      data.forEach((ele) => {
        let IDRef = ele.admissionNo;
        update(dbref(db, "/StudentsData/" + IDRef), {
          ...ele,
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
      data.forEach((ele) => {
        let IDRef = ele.admissionNo;
        update(dbref(db, "/EmailAdmissionNo/" + IDRef), {
          admissionNo: ele.admissionNo,
          email: ele.email,
        });
      });
      let currClass = window.localStorage.getItem("currClass");
      data.forEach((ele, index) => {
        let IDRef = ele.admissionNo;
        update(dbref(db, "/ClassWiseData/" + currClass + "/" + IDRef), {
          rNo: ele.rNo,
        });
      });
    } else {
      alert("Empty file not allowed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
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
          <form
            id="excelForm"
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              gap: ".5rem",
            }}
          >
            <input
              type="file"
              onChange={handleFile}
              id="inputFile"
              accept=".xls,.xlsx"
              style={{
                border: "1px solid black",
                width: "15rem",
                borderRadius: "5px",
                alignSelf: "center",
              }}
              required
            />

            <Button type="submit">submit</Button>
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
    </div>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Holder = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 2px solid grey;
  border-radius: 12px;
  justify-content: center;
  height: 450px;
  background-color: whitesmoke;
  z-index: 0;
  padding-inline: 1.5rem;
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
const Button = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #2c9eda;
  border: 1px solid #2c9eda;
  color: white;
  font-weight: 500;

  :hover {
    color: #1d1d1d;
    background-color: inherit;
    border: 1px solid #1d1d1d;
    box-shadow: 2px 10px 20px 0px #1d1d1d;
  }
`;
export default UploadStudentData;
