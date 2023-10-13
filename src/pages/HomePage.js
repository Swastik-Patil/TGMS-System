import React, { useEffect, useState } from "react";
import Studentportal from "./Student/Studentportal";

export default function HomePage() {
  const [userType, setUserType] = useState(false);
  function checkAuthorization() {
    let usertype = window.localStorage.getItem("usertype");

    if (usertype === "Teacher Guide") {
      window.location.href = "/TGHome";
    }
    if (usertype === "Teacher Guide Coordinator") {
      window.location.href = "/TGCHome";
    }
    if (usertype === "Class Coordinator") {
      window.location.href = "/CCHome";
    }
    if (usertype === "Admin") {
      window.location.href = "/AdminHome";
    }
    if (usertype === "Select an option") {
      window.location.href = "/home";
    }
  }

  useEffect(() => {
    checkAuthorization();
  }, []);

  return <React.Fragment>{<Studentportal />}</React.Fragment>;
}
