import React from "react";
import styled from "styled-components";
import img from "../res/Unauthorize.png";
function Unauthorize() {
  // using img as usauthorize
  return (
    <Container>
      <Img src={img} />
      <span>This page is not publically available.</span>
      <Btn href="/profile">Return Home</Btn>
    </Container>
  );
}

export default Unauthorize;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    color: #8e489c;
    display: block;
    font-weight: bold;
    font-size: 40px;
  }
  @media (max-width: 650px) {
    padding-top: 60px;
    span {
      font-size: 20px;
    }
  }
`;
const Img = styled.img`
  height: 70vh;
  width: 100%;
  @media (max-width: 650px) {
    width: 430px;
    height: 225px;
  }
`;
const Btn = styled.a`
  font-weight: bold;
  border: 3px solid #8e489c;
  font-size: 15px;
  border-radius: 10px;
  padding: 10px 10px;
  background: #8e489c;
  margin: 30px;
  color: white;
`;
