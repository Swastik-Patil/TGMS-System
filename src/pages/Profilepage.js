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
    if (tgemails.indexOf(currentUser.email) !== -1) {
      window.location.replace("/TGHome");
    }
    const ccemails = [
      "ccemail1@gmail.com",
      "ccemail2@gmail.com",
      "ccemail3@gmail.com",
      "ccemail4@gmail.com",
      "ccemail5@gmail.com",
    ];

    if (ccemails.indexOf(currentUser.email) !== -1) {
      window.location.replace("/CCHome");
    }

    if (currentUser.email === "tgcemail@gmail.com") {
      window.location.replace("/TGCHome");
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
