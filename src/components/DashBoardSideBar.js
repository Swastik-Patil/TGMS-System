import React from "react";
import styled from "styled-components";
import BG from "../res/dashboardSidebarBG.jpg";
import { updateDashbaordDetails } from "../utils/Info-funtions";

function DashBoardSideBar() {
  function updateHomeVal() {
    document.getElementById("home").innerHTML =
      '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>';
    window.localStorage.setItem("dashboardHead", "Over All Statistics");
    updateDashbaordDetails("all");
  }

  function updateCompVal() {
    document.getElementById("cm").innerHTML =
      '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>';
    window.localStorage.setItem("dashboardHead", "Computer Technology");
    updateDashbaordDetails("CM");
  }
  function updateMechVal() {
    document.getElementById("me").innerHTML =
      '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>';
    window.localStorage.setItem("dashboardHead", "Mechanical Engineering");
    updateDashbaordDetails("ME");
  }
  function updateCivilVal() {
    document.getElementById("ce").innerHTML =
      '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>';
    window.localStorage.setItem("dashboardHead", "Civil Engineering");
    updateDashbaordDetails("CE");
  }
  function updateICVal() {
    document.getElementById("ic").innerHTML =
      '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>';
    window.localStorage.setItem("dashboardHead", "IC Engineering");
    updateDashbaordDetails("IC");
  }

  function updateChemVal() {
    document.getElementById("ch").innerHTML =
      '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>';
    window.localStorage.setItem("dashboardHead", "Chemical Engineering");
    updateDashbaordDetails("CH");
  }

  function redirectToUploadData() {
    window.location.href = "/HODControlPanel";
  }

  return (
    <Container>
      <MenuBar>
        <Menu id="home" onClick={updateHomeVal}>
          Home
        </Menu>
        <Menu id="cm" onClick={updateCompVal}>
          Computer Technology
        </Menu>
        <Menu id="me" onClick={updateMechVal}>
          Mechanical Engineering
        </Menu>
        <Menu id="ce" onClick={updateCivilVal}>
          Civil Engineering
        </Menu>
        <Menu id="ic" onClick={updateICVal}>
          IC Engineering
        </Menu>
        <Menu id="ch" onClick={updateChemVal}>
          Chemical Engineering
        </Menu>
        <Menu id="uploadData" onClick={redirectToUploadData}>
          Upload Data
        </Menu>
      </MenuBar>
    </Container>
  );
}

export default DashBoardSideBar;

const Container = styled.div`
  width: 25%;
  padding-top: 80px;
  background: url(${BG}) center center/cover no-repeat;
  border: 0.4px solid black;
  height: 105vh;
  box-shadow: 1px 1px 1px grey;
  @media (max-width: 650px) {
    width: 100%;
    padding-top: 60px;
  }
`;

const MenuBar = styled.div`
  border-top: 5px solid white;
  border-bottom: 5px solid white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 40px;
  margin: 10%;
  padding: 20px 5px;
`;

const Menu = styled.div`
  color: white;
  font-size: 20px;
  font-family: 'Baloo 2', 'sans-serif';
  cursor: pointer;
  padding-bottom:2px;
  font-weight: bold;
  &:hover{
    text-decoration:underline;
  }
 
}
`;
