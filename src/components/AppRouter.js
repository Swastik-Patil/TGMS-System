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
  ResetPasswordPage,
  ForgotPasswordPage,
  HomePage,
  PageNotFound,
  HODControlPanel,
  StudentDetails,
  Authenticate,
  UnauthorizePage,
  NotEligiblePage,
  Studentportal,
  UploadedCertificates,
  UploadCertificate,
  CChome,
  UploadResults,
  UploadPage,
  SlowLearners,
  TGHOME,
  UploadStudentData,
  TGCHome,
  UpdateTG,
  TTCHome,
  TGDataHome,
  UploadTGData,
  Notice,
  AdminHome,
  ManagePage,
} from "../pages";

export default function AppRouter() {
  return (
    <>
      <Router>
        <Switch>
          <ProtectedRoute exact path="/" component={HomePage} />
          <ProtectedRoute
            exact
            path="/Studentportal"
            component={Studentportal}
          />
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
          <ProtectedRoute exact path="/Notice" component={Notice} />
          <ProtectedRoute exact path="/UpdateTG" component={UpdateTG} />
          <ProtectedRoute exact path="/TGDataHome" component={TGDataHome} />
          <ProtectedRoute exact path="/UploadTGData" component={UploadTGData} />
          <ProtectedRoute
            exact
            path="/UploadStudentData"
            component={UploadStudentData}
          />

          <ProtectedRoute
            exact
            path="/UnAuthorize"
            component={UnauthorizePage}
          />

          <ProtectedRoute exact path="/TGCHome" component={TGCHome} />
          <ProtectedRoute exact path="/TTCHome" component={TTCHome} />

          <ProtectedRoute exact path="/AdminHome" component={AdminHome} />
          <ProtectedRoute exact path="/ManagePage" component={ManagePage} />

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
