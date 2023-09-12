import {
  Button,
  Center,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
  Container,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Card } from "../components/Card";
import DividerWithText from "../components/DividerWithText";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import BG from "../res/AuthenticateBG.jpeg";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const toast = useToast();
  const { currentUser } = useAuth();

  const [email, setEmail] = useState("");

  return (
    <Contain>
      <Container>
        <Header />
        {currentUser && <Link to="/home"></Link>}
        <Heading textAlign="center" my={12} mt={20} size="xl">
          Forgot Password
        </Heading>
        <Card
          maxW="md"
          mx="auto"
          mt={4}
          style={{
            backgroundColor: "#2a2b38",
            backgroundImage:
              "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg)",
            backgroundPosition: "bottom center",
            backgroundRepeat: "no-repeat",
            backgroundSize: " 300%",
          }}
        >
          <chakra.form
            onSubmit={async (e) => {
              e.preventDefault();
              // your login logic here
              try {
                await forgotPassword(email);
                toast({
                  description: `An email is sent to ${email} for password reset instructions.`,
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
              } catch (error) {
                // console.log(error.message);
                toast({
                  description: error.message,
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              }
            }}
          >
            <Stack spacing="6">
              <FormControl id="email">
                <FormLabel color={"white"}>Email address</FormLabel>
                <Input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <Button
                type="submit"
                colorscheme="pink"
                color={"black"}
                background={"yellow"}
                size="lg"
                fontSize="md"
              >
                Submit
              </Button>
            </Stack>
          </chakra.form>
          <DividerWithText my={6}>OR</DividerWithText>
          <Center>
            <Link color={"white"} to="/register">
              Login
            </Link>
          </Center>
        </Card>
      </Container>
    </Contain>
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
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.4);
  background: url(${BG}) center center/cover no-repeat;
  @media (max-width: 650px) {
    position: absolute;
    height: 100vh;
    width: auto;
  }
`;
