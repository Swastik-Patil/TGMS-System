import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import "../styles/AuthenticateStyle.css";
import { useToast, Select } from "@chakra-ui/react";
import useMounted from "../hooks/useMounted";
import BeatLoader from "react-spinners/BeatLoader";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Authenticate() {
  const [loading, setLoading] = useState(true);
  const { register, login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser } = useAuth();
  const [logemail, setLogEmail] = useState("");
  const [usertype, setUserType] = useState("Select an option");
  const [logpassword, setLogPassword] = useState("");

  const toast = useToast();
  const regmounted = useRef(false);
  const mounted = useMounted();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 2000);
    regmounted.current = true;
    return () => {
      regmounted.current = false;
      clearTimeout(timeoutId);
    };
  }, []);

  function handleRedirectToOrBack() {
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

  const Option = ["Student", "Teacher Guide", "Class Coordinator"];
  function handleUserTypeChange(e) {
    setUserType(e.target.outerText);
    document.querySelector(".select-wrapper").classList.toggle("active");
  }

  function performLogin(e) {
    e.preventDefault();
    document.getElementById("LoginButton").style.disabled = true;
    if (!logemail || !logpassword) {
      toast({
        description: "Credentials not valid.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    document.getElementById("LoginButton").innerHTML =
      '<div className="spinner-border spinner-border-sm" role="status"></div>';
    setIsSubmitting(true);

    login(logemail, logpassword)
      .then((res) => {
        handleRedirectToOrBack();
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/wrong-password).") {
          toast({
            position: "top-right",
            description: "Wrong Password.",
            status: "error",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }

        if (error.message === "Firebase: Error (auth/user-not-found).") {
          register(logemail, logpassword).then((res) => {
            //redirect to home page
            toast({
              position: "top-right",
              description: "Login in successful !",
              status: "success",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
        }
      })
      .finally(() => {
        document.getElementById("LoginButton").innerHTML = "Login";
        mounted.current && setIsSubmitting(false);
      });

    e.preventDefault();

    document.getElementById("LoginButton").style.disabled = false;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        height: "100vh",
        width: "100%",
      }}
    >
      {loading ? (
        <>
          <BeatLoader color="#1A2B40" size={18} margin={2} loading={loading} />
        </>
      ) : (
        <Contain>
          <Header noLogin={true} />
          {currentUser && <Link to="/home"></Link>}
          <div className="section">
            <div className="row  justify-content-center">
              <div className="col-12 text-center align-self-center">
                <div className="text-center">
                  <div className="card-3d-wrap mx-auto">
                    <div className="card-3d-wrapper">
                      <div className="card-front">
                        <div className="center-wrap">
                          <div
                            className="text-center"
                            style={{ width: "100%", padding: "50px" }}
                          >
                            <h4
                              className="mb-4 pb-3"
                              style={{
                                color: "white",
                                fontSize: "20px",
                                fontWeight: "bold",
                              }}
                            >
                              Log In
                            </h4>
                            <div className="form-group">
                              <input
                                type="email"
                                name="logemail"
                                className="form-style"
                                placeholder="Your Email"
                                id="logemail"
                                autoComplete="off"
                                value={logemail}
                                onChange={(e) => setLogEmail(e.target.value)}
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group">
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
                                  <div className="select-button-text">
                                    {usertype}
                                  </div>
                                  <i className="bx bx-chevron-down">{"↓"}</i>
                                </div>

                                <ul className="options">
                                  {Option.map((ele, index) => {
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
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                name="logpass"
                                className="form-style"
                                placeholder="Your Password"
                                id="logpass"
                                autoComplete="off"
                                value={logpassword}
                                onChange={(e) => setLogPassword(e.target.value)}
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <button
                              id="LoginButton"
                              className="Btn mt-4"
                              onClick={(e) => {
                                performLogin(e);
                              }}
                            >
                              Log In
                            </button>
                            <p className="mb-0 mt-4 text-center">
                              <Link to="/forgot-password">
                                Forgot password?
                              </Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Contain>
      )}
    </div>
  );
}

const Contain = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  color: white;
  font-family: sans-serif;
  height: fit-content;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 650px) {
    position: absolute;
    background-attachment: fixed;
    height: fit-content;
    width: 110wh;
  }
`;

export default Authenticate;
