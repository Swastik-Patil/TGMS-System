import React, { useState } from "react";
import "../../styles/UploadPage.css";
import Header from "../../components/Header";
import * as XLSX from "xlsx";
import { ref as dbref, update } from "firebase/database";
import { database } from "../../utils/init-firebase";
import styled from "styled-components";
import { ChevronDownIcon } from "../../utils/ChevronDownIcon";
import { useToast } from "@chakra-ui/react";
export const UploadResults = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [examType, setExamType] = useState("Select an Examination");
  const [sem, setSem] = useState("Selecta SEM");
  const toast = useToast();
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

      toast({
        position: "top-right",
        description: "Result Uploading Started.",
        status: "info",
        duration: 1000,
        isClosable: true,
      });
      setExcelFile(data);
      const db = database;

      data.forEach((ele) => {
        const IDRef = ele.admissionNo;
        delete ele["name"];
        delete ele["admissionNo"];
        delete ele["rNo"];

        if (examType === "IA 1" || examType === "IA 2") {
          let obj = Object.keys(ele).map((key) => {
            return ele[key];
          });
          try {
            obj.forEach((e) => {
              if (e <= 8) {
                throw new Error("Break the loop.");
              }
            });
          } catch (error) {
            ele["studentType"] = "Slow";
          }
        } else {
          let obj = Object.keys(ele).map((key) => {
            return ele[key];
          });
          try {
            obj.forEach((e) => {
              if (e <= 32) {
                throw new Error("Break the loop.");
              }
            });
          } catch (error) {
            ele["studentType"] = "Slow";
          }
        }

        if (ele.studentType !== "Slow") {
          ele["studentType"] = "Advance";
        }

        update(dbref(db, "/StudentsData/" + IDRef + "/"), {
          studentType: ele.studentType,
        });
        delete ele["studentType"];
        update(
          dbref(
            db,
            "/StudentsData/" + IDRef + "/Results/" + sem + "/" + examType + "/"
          ),
          {
            ...ele,
          }
        );
      });
      toast({
        position: "top-right",
        description: "Result Uploaded Successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      alert("Empty file not allowed");
    }
  };

  const Option = ["IA 1", "IA 2", "SEM"];
  const Option2 = [
    "SEM 1",
    "SEM 2",
    "SEM 3",
    "SEM 4",
    "SEM 5",
    "SEM 6",
    "SEM 7",
    "SEM 8",
  ];
  function handleExamTypeChange(e) {
    setExamType(e.target.outerText);
    document.querySelectorAll(".select-wrapper")[1].classList.toggle("active");
  }
  function handleSemChange(e) {
    setSem(e.target.outerText);
    document.querySelectorAll(".select-wrapper")[0].classList.toggle("active");
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
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="form-group">
              <div className="select-wrapper">
                <div
                  className="select-button"
                  onClick={() => {
                    if (
                      document
                        .querySelectorAll(".select-wrapper")[1]
                        .classList.contains("active")
                    ) {
                      document
                        .querySelectorAll(".select-wrapper")[1]
                        .classList.toggle("active");
                    }

                    document
                      .querySelectorAll(".select-wrapper")[0]
                      .classList.toggle("active");
                  }}
                  onBlur={() => {
                    document
                      .querySelectorAll(".select-wrapper")[0]
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
              <div className="select-wrapper">
                <div
                  className="select-button"
                  onClick={() => {
                    if (
                      document
                        .querySelectorAll(".select-wrapper")[0]
                        .classList.contains("active")
                    ) {
                      document
                        .querySelectorAll(".select-wrapper")[0]
                        .classList.toggle("active");
                    }
                    document
                      .querySelectorAll(".select-wrapper")[1]
                      .classList.toggle("active");
                  }}
                  onBlur={() => {
                    document
                      .querySelectorAll(".select-wrapper")[1]
                      .classList.toggle("active");
                  }}
                >
                  <div className="select-button-text">{examType}</div>
                  <i className="bx bx-chevron-down">
                    <ChevronDownIcon />
                  </i>
                </div>
                <ul className="options">
                  {Option.map((ele, index) => {
                    return (
                      <div
                        className="option"
                        onClick={(e) => {
                          handleExamTypeChange(e);
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
                onChange={handleFile}
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
            <Button type="submit">submit</Button>
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

  :hover {
    color: #1d1d1d;
    background-color: inherit;
    border: 1px solid #1d1d1d;
    box-shadow: 2px 10px 20px 0px #1d1d1d;
  }
`;
export default UploadResults;
