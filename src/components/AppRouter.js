import React from "react";
import "../style.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import {
  Profilepage,
  ResetPasswordPage,
  ForgotPasswordPage,
  HomePage,
  PageNotFound,
  HODControlPanel,
  StudentDetails,
  Authenticate,
  UnauthorizePage,
  NotEligiblePage,
  UploadedCertificates,
  UploadCertificate,
  CChome,
  UploadResults,
  UploadPage,
  SlowLearners,
  TGHOME,
} from "../pages";

export default function AppRouter() {
  return (
    <>
      <Router>
        <Switch>
          <ProtectedRoute exact path="/" component={HomePage} />
          <ProtectedRoute
            path="/uploadCertificate"
            component={UploadCertificate}
          />
          <ProtectedRoute
            path="/uploadedCertificates"
            component={UploadedCertificates}
          />
          <ProtectedRoute exact path="/login" component={Authenticate} />
          <ProtectedRoute exact path="/register" component={Authenticate} />
          <ProtectedRoute exact path="/profile" component={Profilepage} />
          <ProtectedRoute exact path="/home" component={HomePage} />
          <ProtectedRoute exact path="/CCHome" component={CChome} />
          <ProtectedRoute
            exact
            path="/UploadResults"
            component={UploadResults}
          />
          <ProtectedRoute exact path="/UploadPage" component={UploadPage} />
          <ProtectedRoute exact path="/SlowLearners" component={SlowLearners} />

          <ProtectedRoute exact path="/TGHOME" component={TGHOME} />

          <ProtectedRoute
            exact
            path="/UnAuthorize"
            component={UnauthorizePage}
          />

          <ProtectedRoute exact path="/Details" component={StudentDetails} />

          <ProtectedRoute
            exact
            path="/HODControlPanel"
            component={HODControlPanel}
          />
          <ProtectedRoute
            exact
            path="/forgot-password"
            component={ForgotPasswordPage}
          />
          <ProtectedRoute
            exact
            path="/reset-password"
            component={ResetPasswordPage}
          />
          <ProtectedRoute
            exact
            path="/notEligible"
            component={NotEligiblePage}
          />

          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </>
  );
}

function ProtectedRoute(props) {
  const { currentUser } = useAuth();
  const { path } = props;
  const location = useLocation();
  if (
    path === "/login" ||
    path === "/register" ||
    path === "/forgot-password" ||
    path === "/reset-password"
  ) {
    return currentUser ? (
      <Redirect to={location.state?.from ?? "/home"} />
    ) : (
      <Route {...props} />
    );
  }
  return currentUser ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: path },
      }}
    />
  );
}
