import React, { useState } from "react";
import Header from "../../components/Header";
import styled from "styled-components";
import { useToast } from "@chakra-ui/react";
import { ref as dbref, remove, update } from "firebase/database";
import { database } from "../../utils/init-firebase";
import * as XLSX from "xlsx";
import { ChevronDownIcon } from "../../utils/ChevronDownIcon";

export default function ExamDeck() {
  const [excelFile, setExcelFile] = useState(null);
  const [sem, setSem] = useState("Select a SEM");
  const [class_y, setClass_Y] = useState("Select a Class");
  const toast = useToast();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setExcelFile(e.target.result);
    };

    reader.readAsBinaryString(file);
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (
      excelFile !== null &&
      sem !== "Select a SEM" &&
      class_y !== "Select a Class"
    ) {
      const binaryStr = excelFile;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonSheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      jsonSheetData.shift();
      const headers1 = jsonSheetData[0];
      const headers2 = jsonSheetData[2];
      const rows = jsonSheetData.slice(3);
      let formattedColumns = [];
      let header = "";
      for (let i = 0; i < headers1.length; i++) {
        if (headers1[i] === undefined && headers2[i] !== undefined && i > 3) {
          formattedColumns.push(header + "_" + headers2[i]);
          continue;
        } else {
          header = headers1[i];
        }
        if (headers1[i] === undefined && headers2[i] === undefined) {
          formattedColumns.push("Empty");
        } else if (headers1[i] === undefined) {
          formattedColumns.push(headers2[i]);
        } else if (headers2[i] === undefined) {
          formattedColumns.push(headers1[i]);
        } else {
          formattedColumns.push(headers1[i] + "_" + headers2[i]);
        }
      }

      rows.forEach((row) => {
        if (row[0] === undefined || !String(row[0]).includes("HE")) return;

        let student = {};
        for (let i = 0; i < formattedColumns.length; i++) {
          student[formattedColumns[i]] = row[i];
        }

        const db = database;
        const IDRef = dbref(db, "results/" + sem + "/" + student["ADM NO"]);
        update(IDRef, student);
        if (student["RSLT"] === "F") {
          update(dbref(db, `StudentsData/${student["ADM NO"]}`), {
            studentType: "Slow",
          });
        } else {
          update(dbref(db, `StudentsData/${student["ADM NO"]}`), {
            studentType: "Advance",
          });
        }
      });

      toast({
        position: "top-right",
        title: "Result Uploaded Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const Option1 = ["SE", "TE", "BE"];
  const Option2 = ["SEM 3", "SEM 4", "SEM 5", "SEM 6", "SEM 7", "SEM 8"];

  function handleClassChange(e) {
    setClass_Y(e.target.outerText);
    document.querySelector(".class_select").classList.toggle("active");
  }

  function handleSemChange(e) {
    setSem(e.target.outerText);
    document.querySelector(".sem_select").classList.toggle("active");
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
              <li>
                Download the template for filling data from here :{" "}
                <a
                  style={{ color: "blue" }}
                  href="https://docs.google.com/spreadsheets/d/1QU4lv22xa71U4KGUV7VOkO84V7we5mP1r_Bi5zOaWK0/edit?usp=sharing"
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
              <li style={{ color: "red" }}>Result should be on sheet 1</li>
              <li>
                Refresh Page to upload another file after uploading one file
              </li>
            </ol>
          </Instructions>
          <form
            id="excelForm"
            // onSubmit={handleSubmit}
            onSubmit={handleFileSubmit}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              flexDirection: "row",
              gap: "1rem",
              paddingInline: "1rem",
            }}
          >
            <div className="form-group">
              <div className="select-wrapper class_select">
                <div
                  className="select-button"
                  onClick={() => {
                    document
                      .querySelector(".class_select")
                      .classList.toggle("active");
                  }}
                  onBlur={() => {
                    document
                      .querySelector(".class_select")
                      .classList.toggle("active");
                  }}
                >
                  <div className="select-button-text">{class_y}</div>
                  <i className="bx bx-chevron-down">
                    <ChevronDownIcon />
                  </i>
                </div>
                <ul className="options">
                  {Option1.map((ele, index) => {
                    return (
                      <div
                        className="option"
                        onClick={(e) => {
                          handleClassChange(e);
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
            <div className="form-group">
              <div className="select-wrapper sem_select">
                <div
                  className="select-button"
                  onClick={() => {
                    document
                      .querySelector(".sem_select")
                      .classList.toggle("active");
                  }}
                  onBlur={() => {
                    document
                      .querySelector(".sem_select")
                      .classList.toggle("active");
                  }}
                >
                  <div className="select-button-text">{sem}</div>
                  <i className="bx bx-chevron-down">
                    <ChevronDownIcon />
                  </i>
                </div>
                <ul className="options">
                  {Option2.map((ele, index) => {
                    return (
                      <div
                        className="option"
                        onClick={(e) => {
                          handleSemChange(e);
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
            <div className="form-group">
              <input
                type="file"
                onChange={handleFileUpload}
                id="inputFile"
                accept=".xls,.xlsx"
                style={{
                  border: "1px solid black",
                  borderRadius: "5px",
                  marginBlock: ".7rem",
                }}
                required
              />
            </div>
            <div className="form-group">
              <Button type="submit">SUBMIT</Button>
            </div>
          </form>
        </Holder>
      </Container>
    </>
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
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid grey;
  border-radius: 12px;
  justify-content: center;
  background-color: whitesmoke;
  z-index: 0;
  padding-block: 1rem;
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
  background-color: white;
  z-index: 0;
  margin: 5px;

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
  width: 10rem;
  transition: all 0.3s ease;
  :hover {
    color: #1d1d1d;
    background-color: inherit;
    border: 1px solid #1d1d1d;
    box-shadow: 2px 10px 20px 0px #1d1d1d;
  }
`;
