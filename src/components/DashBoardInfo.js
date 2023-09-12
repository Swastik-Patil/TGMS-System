import React from "react";
import styled from "styled-components";
import DashBoardCard from "./DashBoardCard";
import DashBoardUtils from "./DashBoardUtils";

function DashBoardInfo() {
  return (
    <Contain>
      <Holder>
        <Title>{window.localStorage.getItem("dashboardHead")}</Title>
        <DashBoardCard />
        <DashBoardUtils />
      </Holder>
    </Contain>
  );
}

const Contain = styled.div`
  padding-top: 65px;
  width: 80%;
  font-family: Roboto, sans-serif;
`;

const Holder = styled.div`
  width: 100%;
  background-color: white;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 500;
`;

export default DashBoardInfo;
