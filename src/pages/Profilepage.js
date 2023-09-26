import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Studentportal from "../components/Studentportal";

export default function Profilepage() {
  const { currentUser } = useAuth();

  function checkAuthorization() {
    const tgemails = [
      "tgemail1@gmail.com",
      "tgemail2@gmail.com",
      "tgemail3@gmail.com",
      "tgemail4@gmail.com",
      "tgemail5@gmail.com",
    ];
    const ccemails = [
      "ccemail1@gmail.com",
      "ccemail2@gmail.com",
      "ccemail3@gmail.com",
      "ccemail4@gmail.com",
      "ccemail5@gmail.com",
    ];
    const tgcemail = ["tgcemail@gmail.com"];
    const ttcemail = ["ttcemail@gmail.com"];

    if (tgemails.indexOf(currentUser.email) !== -1) {
      window.location.replace("/TGHome");
    }
    if (ccemails.indexOf(currentUser.email) !== -1) {
      window.location.replace("/CCHome");
    }
    if (tgcemail.indexOf(currentUser.email) !== -1) {
      window.location.replace("/TGCHome");
    }
    if (ttcemail.indexOf(currentUser.email) !== -1) {
      window.location.replace("/TTCHome");
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
