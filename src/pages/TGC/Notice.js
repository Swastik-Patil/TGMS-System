import React, { useEffect, useState } from "react";
import "../../styles/print.css";
import "../../styles/BonafidePreview.css";
import BeatLoader from "react-spinners/BeatLoader";
import logo from "../../res/MES Flower.png";
import Header from "../../components/Header";
import { ChevronDownIcon } from "../../utils/ChevronDownIcon";
import { Table, Tr, Td, Th, Tbody } from "@chakra-ui/react";
import {
  update,
  ref as dbref,
  get,
  child,
  getDatabase,
} from "firebase/database";
import { database } from "../../utils/init-firebase";
import { useToast } from "@chakra-ui/react";

export default function Notice() {
  const [loading, setLoading] = useState(true);
  const [nextDate, setNextDate] = useState(null);

  function handleBack() {
    window.location.href = "/home";
  }
  const toast = useToast();

  function PrintDoc() {
    let Btns = document.getElementById("Actions");
    let DropDown = document.querySelector(".selectClass");
    let header = document.getElementById("header");

    // Hide
    DropDown.style.visibility = "hidden";
    Btns.style.visibility = "hidden";
    header.style.visibility = "hidden";

    saveNotice();
    window.print();

    // Display Again
    DropDown.style.visibility = "visible";
    Btns.style.visibility = "visible";
    header.style.visibility = "visible";
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
        getNextSaturday();
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

  function getNextSaturday() {
    var date = new Date();
    var day = date.getDay();
    var daysUntilSaturday = 6 - day;

    date.setDate(date.getDate() + daysUntilSaturday);

    date.setHours(11);
    date.setMinutes(15);
    date.setSeconds(0);

    setNextDate(String(date));
  }

  function saveNotice() {
    const notice = {
      class: Class,
      students: data.map((student) => {
        return {
          admissionNo: student.admissionNo,
          rNo: student.rNo,
          name: student.name,
        };
      }),
      noticeOn: String(
        new Date().getDate() +
          "/" +
          (new Date().getMonth() + 1) +
          "/" +
          new Date().getFullYear()
      ),
      date: nextDate,
    };
    update(dbref(database, "/notices/" + Class + "/" + nextDate), {
      ...notice,
    }).then(() => {
      toast({
        position: "top-right",
        description: "Notice saved successfully",
        status: "success",
        duration: 2500,
        isClosable: true,
      });
    });
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
    getNextSaturday();
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
              <div id="notice__doc">
                <div className="notice__heading">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      className="notice__logo"
                      src={logo}
                      alt="Logo"
                      id="logo"
                      srcSet=""
                    />
                  </div>
                  <div>
                    <p className="notice__header" id="clgTitle">
                      Mahatma Education Society's
                    </p>
                    <p className="notice__header" id="clgTitle">
                      Pillai HOC College of Engineering and Technology, Rasayani
                    </p>
                    <p className="notice__header" id="clgTitle">
                      Department of Computer Engineering
                    </p>
                  </div>
                </div>
                <div className="dash"></div>
                <div id="doc__body">
                  <div className="notice__title">
                    <h2 id="bcTitle">Notice</h2>
                  </div>
                  <p className="date">
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
                  <p
                    style={{
                      textDecoration: "underline",
                      fontWeight: "bold",
                    }}
                  >
                    Subject : Extra Lecture for Slow Learners of class{" "}
                    <span>{"CLASS"}</span>
                  </p>
                  <br />
                  <p style={{ textIndent: "50px", textAlign: "justify" }}>
                    Dear Students, An extra class is scheduled for students who
                    find learning a bit slower. If you're one of these students,
                    please make sure to attend this session. We'll be covering
                    topics at a pace that suits everyone, and you'll have plenty
                    of opportunities to ask questions and get the help you need.
                    Your participation is important, so mark your calendars and
                    be there!
                  </p>{" "}
                  <p style={{ textIndent: "50px", textAlign: "justify" }}>
                    The lecture will be held on {nextDate}
                  </p>{" "}
                  <br />
                  <p>Student Names :</p>
                  <Table marginTop={2}>
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

                <div className="notice__Signatures">
                  <div className="notice__clerk">
                    <h3 className="signText">
                      <br />
                      HoD
                    </h3>
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
