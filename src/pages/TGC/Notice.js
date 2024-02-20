import React, { useEffect, useState } from "react";
import "../../styles/print.css";
import "../../styles/BonafidePreview.css";
// import { ref as dbref, child, get } from "firebase/database";
import BeatLoader from "react-spinners/BeatLoader";
import logo from "../../res/MES Flower.png";
import Header from "../../components/Header";
import { ChevronDownIcon } from "../../utils/ChevronDownIcon";
import { Table, Tr, Td, Th, Tbody } from "@chakra-ui/react";
import { ref as dbref, get, child, getDatabase } from "firebase/database";
import { useToast } from "@chakra-ui/react";

export default function Notice() {
  // const [userData, setUserData] = useState(null);
  // const [branch, setBranch] = useState(null);
  // const [enroll, setEnroll] = useState(null);
  // const [actionDate, setActionDate] = useState(null);
  const [loading, setLoading] = useState(true);

  // function readNoticeData() {
  //   let data = JSON.parse(window.localStorage.getItem("SlowStudents")).map(
  //     (ele) => {
  //       return JSON.parse(ele);
  //     }
  //   );

  //   data = data.map((ele) => {
  //     return {
  //       admissionNo: ele.admissionNo,
  //       name: ele.name,
  //       rNo: ele.rNo,
  //       class: "TE A",
  //     };
  //   });

  //   setUserData(data);
  //   console.log(userData);
  //   setLoading(false);
  // }

  function handleBack() {
    window.location.href = "/home";
  }

  // function formatNo(No) {
  //   let no = new String(No);
  //   if (no.length != 3) {
  //     while (no.length < 3) {
  //       no = "0" + no;
  //     }
  //   }
  //   return no;
  // }

  useEffect(() => {
    // readNoticeData();
  }, []);

  const toast = useToast();

  function PrintDoc() {
    let Btns = document.getElementById("Actions");
    let DropDown = document.querySelector(".selectClass");
    let header = document.getElementById("header");
    let border1 = document.querySelector(".bc__Border1");
    let border2 = document.querySelector(".bc__Border2");

    // Hide
    DropDown.style.visibility = "hidden";
    Btns.style.visibility = "hidden";
    header.style.visibility = "hidden";
    border1.style.border = "none";
    border2.style.border = "none";

    window.print();

    // Display Again
    DropDown.style.visibility = "visible";
    Btns.style.visibility = "visible";
    header.style.visibility = "visible";
    border1.style.border = "solid black thick";
    border2.style.border = "solid black";
  }

  const [data, setData] = useState([]);
  const [Class, setClass] = useState(null);
  const [Option, setOption] = useState("Select Class");

  let allOptions = ["SE A", "SE B", "SE C", "TE A", "TE C", "BE A", "BE C"];

  function handleUserTypeChange(e) {
    if (e.target.outerText === Option) {
      toast({
        position: "top-right",
        description: "Already selected !",
        status: "info",
        duration: 2500,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    setOption(e.target.outerText);
    setClass(e.target.outerText);
    document.querySelector(".select-wrapper").classList.toggle("active");
    setTimeout(() => {
      getStudentNames();
    }, 2000);
  }

  async function getStudentNames() {
    const db = dbref(getDatabase());

    try {
      let CName = document.querySelector(".select-button-text").innerText;
      CName = CName.replace(/ +/g, "");
      const snapshot = await get(child(db, "/ClassWiseData/" + CName + "/"));
      if (snapshot.exists()) {
        let data = snapshot.val();
        let sortedEntries = Object.entries(data).sort(
          (a, b) => a[1].rNo - b[1].rNo
        );
        let sortedData = Object.fromEntries(sortedEntries);
        sortedData = Object.keys(sortedData).map((key) => key);
        let result = [];
        const promises = sortedData.map((ele) =>
          get(child(db, "/StudentsData/" + ele))
        );
        const snapshots = await Promise.all(promises);
        snapshots.forEach((snapshot) => {
          if (snapshot.exists()) {
            let res = snapshot.val();
            if (res.studentType === "Slow") {
              result.push(res);
            }
          }
        });

        setData(result);
        setLoading(false);
      } else {
        toast({
          position: "top-right",
          description: "No data available",
          status: "error",
          duration: 2500,
          isClosable: true,
        });
        setClass(null);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    let usertype = window.localStorage.getItem("usertype");
    if (usertype === "Teacher Guardian") {
      window.location.href = "/TGHome";
    }
    if (usertype === "Student") {
      window.location.href = "/home";
    }
    if (usertype === "Class Coordinator") {
      window.location.href = "/CCHome";
    }
  }, []);

  return (
    <>
      <Header />
      <div className="form-group selectClass" style={{ width: "100%" }}>
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
            <div className="select-button-text">{Option}</div>
            <i className="bx bx-chevron-down">
              <ChevronDownIcon />
            </i>
          </div>

          <ul className="options">
            {allOptions.map((ele, index) => {
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
      {!Class ? (
        <div></div>
      ) : (
        <div>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100%",
              }}
            >
              <BeatLoader
                color="#1A2B40"
                size={18}
                margin={2}
                loading={loading}
              />
            </div>
          ) : (
            <div className="container">
              <div id="bc__doc">
                <div className="bc__Border1">
                  <div className="bc__Border2">
                    <div className="bc__heading">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          className="bc__logo"
                          src={logo}
                          alt="Logo"
                          id="logo"
                          srcSet=""
                        />
                      </div>
                      <div>
                        <p className="bc__header" id="clgTitle">
                          Pillai HOC College of Engineering and Technology
                        </p>
                        <p style={{ fontSize: "small" }}>Header </p>
                      </div>
                    </div>
                    <div className="dash"></div>
                    <div id="body">
                      <p className="date">
                        <span></span>
                        <span>
                          Date:{" "}
                          <span id="TodayDate">
                            {new Date().getDate() +
                              "/" +
                              (new Date().getMonth() + 1) +
                              "/" +
                              new Date().getFullYear()}
                          </span>
                        </span>
                      </p>
                      <div className="bc__title">
                        <h2 id="bcTitle">NOTICE</h2>
                      </div>
                      <span> Content </span> <br />
                      <label htmlFor="studentName">Student Names :</label>
                      <Table>
                        <Tbody>
                          <Tr>
                            <Th paddingTop={0} borderBottom={0}>
                              Admission No.
                            </Th>
                            <Th paddingTop={0} borderBottom={0}>
                              Roll No.
                            </Th>
                            <Th paddingTop={0} borderBottom={0}>
                              Name
                            </Th>
                          </Tr>
                          {data &&
                            data.map((ele, index) => {
                              return (
                                <Tr className="option" key={index}>
                                  <Td
                                    className="option-text"
                                    paddingTop={0}
                                    borderBottom={0}
                                  >
                                    {ele.admissionNo}
                                  </Td>
                                  <Td
                                    className="option-text"
                                    paddingTop={0}
                                    borderBottom={0}
                                  >
                                    {ele.rNo}
                                  </Td>
                                  <Td
                                    className="option-text"
                                    paddingTop={0}
                                    borderBottom={0}
                                  >
                                    {ele.name}
                                  </Td>
                                </Tr>
                              );
                            })}
                        </Tbody>
                      </Table>
                    </div>

                    <div className="bc__Signatures">
                      <div className="bc__clerk">
                        <h3 className="signText">
                          <br />
                          HOD
                        </h3>
                      </div>
                      <div className="bc__principal">
                        <h3 className="signText">
                          <br />
                          Principal
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="Actions">
                <input
                  type="button"
                  onClick={PrintDoc}
                  id="printBtn"
                  value="Print"
                  className="btns"
                />
                <input
                  type="button"
                  onClick={handleBack}
                  id="printBtn"
                  value="Go Back"
                  className="btn btn-danger"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
