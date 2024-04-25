import React, { useEffect, useState } from "react";
import "../../styles/print.css";
import "../../styles/BonafidePreview.css";
import logo from "../../res/MES Flower.png";
import Header from "../../components/Header";
import { Table, Tr, Td, Th, Tbody } from "@chakra-ui/react";

export default function GeneratedNotice() {
  const [notice, setNotice] = useState(null);
  useEffect(() => {
    let usertype = window.localStorage.getItem("usertype");
    if (usertype === "Teacher Guardian") {
      window.location.href = "/TGHome";
    }
    if (usertype === "Teacher Guardian Coordinator") {
      window.location.href = "/TGCHome";
    }
    if (usertype === "Class Coordinator") {
      window.location.href = "/CCHome";
    }

    let notice = window.localStorage.getItem("selectedNotice");
    notice = JSON.parse(notice);

    setNotice(notice);
  }, []);

  return (
    <>
      <Header />
      {notice && (
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
                  Date: <span id="TodayDate">{notice.noticeOn}</span>
                </span>
              </p>
              <p
                style={{
                  textDecoration: "underline",
                  fontWeight: "bold",
                }}
              >
                Subject : Extra Lecture for Slow Learners of class{" "}
                <span>{notice.class}</span>
              </p>
              <br />
              <p style={{ textIndent: "50px", textAlign: "justify" }}>
                Dear Students, An extra class is scheduled for students who find
                learning a bit slower. If you're one of these students, please
                make sure to attend this session. We'll be covering topics at a
                pace that suits everyone, and you'll have plenty of
                opportunities to ask questions and get the help you need. Your
                participation is important, so mark your calendars and be there!
              </p>{" "}
              <p style={{ textIndent: "50px", textAlign: "justify" }}>
                The lecture will be held on {notice.date}
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
                  {notice.students &&
                    notice.students.map((ele, index) => {
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
          </div>
        </div>
      )}
    </>
  );
}
