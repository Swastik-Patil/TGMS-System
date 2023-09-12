import React, { useEffect, useState } from "react";
import { ref as dbref, get, child } from "firebase/database";
import { database } from "../utils/init-firebase";
import { useAuth } from "../contexts/AuthContext";
import BeatLoader from "react-spinners/BeatLoader";
import "../styles/pagenotfound.css";

export default function NotEligiblePage() {
  const { currentUser } = useAuth();
  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState(true);

  function checkIfEligible() {
    const db = dbref(database);
    get(child(db, "/users/" + currentUser.uid)).then((snapshot) => {
      if (snapshot.exists()) {
        setPending(true);
      }
    });
  }

  useEffect(() => {
    checkIfEligible();

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="Parent">
      {loading ? (
        <></>
      ) : (
        <div className="terminal">
          <h1>
            Not Eligible <span className="errorcode">Oops</span>
          </h1>
          {pending ? (
            <>
              <p className="output">
                Sorry, You already have a pending request. Please wait for the
                response.
              </p>
              <p className="output">
                You can only apply for another bonafide after 3 months
              </p>
              <p className="output">
                Please try to [go back] or{" "}
                <a href="/home">return to the homepage</a>.
              </p>
            </>
          ) : (
            <>
              <p className="output">
                Sorry, You can only apply for another bonafide after 3 months
                from last approval bonafide
              </p>
              <p className="output">
                Please try to [go back] or{" "}
                <a href="/home">return to the homepage</a>.
              </p>
              <p className="output">
                Download your latest bonafide certificate from here{" "}
                <a href="/bonafidePreview">Download Now</a>.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
