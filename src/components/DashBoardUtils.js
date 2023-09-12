import React from "react";
import styled from "styled-components";
import ContainerWithButton from "./ContainerWithButton";

function DashBoardUtils() {
  return (
    <Contain>
      <ContainerWithButton
        Title={"Manage Authentication"}
        Details={"To add,block or delete user credentials"}
        URL={
          "https://console.firebase.google.com/u/4/project/gov-poly-pen-portal/authentication/users"
        }
        ButtonDesc={"Modify"}
      />
      <ContainerWithButton
        Title={"Hosting Account"}
        Details={"To access Firebase (backend) Dashboard. "}
        URL={
          "https://console.firebase.google.com/u/4/project/gov-poly-pen-portal/hosting/sites"
        }
        ButtonDesc={"Visit"}
      />
      <ContainerWithButton
        Title={"Billing Account"}
        Details={"To pay bills for Firebase services. "}
        URL={"#"}
        ButtonDesc={"View"}
      />
    </Contain>
  );
}

export default DashBoardUtils;

const Contain = styled.div`
  display: flex;
  font-family: Roboto, sans-serif;
  @media (max-width: 650px) {
    flex-direction: column;
    gap: 20px;
  }
`;
