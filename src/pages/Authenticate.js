import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import "../styles/AuthenticateStyle.css";
import { useToast } from "@chakra-ui/react";
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
    window.location.href = "/profile";
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
          <Header />
          {currentUser && <Link to="/home"></Link>}
          <div className="section">
            <div className="row  justify-content-center">
              <div className="col-12 text-center align-self-center">
                <div className="section text-center">
                  <div className="card-3d-wrap mx-auto">
                    <div className="card-3d-wrapper">
                      <div className="card-front">
                        <div className="center-wrap">
                          <div className="section text-center">
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
                              onClick={async (e) => {
                                e.preventDefault();
                                document.getElementById(
                                  "LoginButton"
                                ).style.disabled = true;
                                if (!logemail || !logpassword) {
                                  toast({
                                    description: "Credentials not valid.",
                                    status: "error",
                                    duration: 9000,
                                    isClosable: true,
                                  });
                                  return;
                                }
                                document.getElementById(
                                  "LoginButton"
                                ).innerHTML =
                                  '<div class="spinner-border spinner-border-sm" role="status"></div>';
                                setIsSubmitting(true);
                                login(logemail, logpassword)
                                  .then((res) => {
                                    handleRedirectToOrBack();
                                  })
                                  .catch((error) => {
                                    // console.log(error.message);
                                    register(logemail, logpassword).then(
                                      (res) => {
                                        //redirect to home page
                                        toast("Login in successful !", {
                                          position: "top-right",
                                          autoClose: 5000,
                                          hideProgressBar: false,
                                          closeOnClick: true,
                                          pauseOnHover: true,
                                          draggable: true,
                                          progress: undefined,
                                        });
                                      }
                                    );
                                  })
                                  .finally(() => {
                                    document.getElementById(
                                      "LoginButton"
                                    ).innerHTML = "Login";
                                    mounted.current && setIsSubmitting(false);
                                  });

                                e.preventDefault();

                                document.getElementById(
                                  "LoginButton"
                                ).style.disabled = false;
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
