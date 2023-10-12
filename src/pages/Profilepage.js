import React, { useEffect } from "react";
import Studentportal from "../components/Studentportal";

export default function Profilepage() {
  function checkAuthorization() {
    let usertype = window.localStorage.getItem("usertype");

    if (usertype === "Student") {
      window.location.href = "/profile";
    }
    if (usertype === "Teacher Guide") {
      window.location.href = "/TGHome";
    }
    if (usertype === "Class Coordinator") {
      window.location.href = "/CCHome";
    }
    if (usertype === "Select an option") {
      window.location.href = "/profile";
    }
  }

  useEffect(() => {
    checkAuthorization();
    return () => {};
  }, []);

  return (
    <React.Fragment>
      <Studentportal />
    </React.Fragment>
  );
}
