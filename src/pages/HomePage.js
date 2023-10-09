import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Studentportal from "./Student/Studentportal";

export default function HomePage() {
  const { currentUser } = useAuth();
  const [userType, setUserType] = useState(false);
  function checkAuthorization() {
    let usertype = window.localStorage.getItem("usertype");
    if (usertype === "Student") {
      setUserType(true);
      return;
    }
    if (usertype === "Teacher Guide") {
      window.location.href = "/TGHome";
    }
    if (usertype === "Teacher Guide Coordinator") {
      window.location.href = "/TGCHome";
    }
    if (usertype === "Class Coordinator") {
      window.location.href = "/CCHome";
    }
    if (usertype === "Select an option") {
      window.location.href = "/home";
    }
  }

  useEffect(() => {
    checkAuthorization();
    return () => {};
  }, []);

  return <React.Fragment>{userType && <Studentportal />}</React.Fragment>;
}
