import React from "react";
import Details from "../components/Details";

function StudentDetails({ showActionPanel, navItems, subNavItems }) {
  return (
    <Details
      showActionPanel={showActionPanel}
      navItems={navItems}
      subNavItems={subNavItems}
    />
  );
}

export default StudentDetails;
