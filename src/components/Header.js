// import { Spacer } from "@chakra-ui/react";
// import React from "react";
// import styled from "styled-components";
// import { useAuth } from "../contexts/AuthContext";
// import { NavLink as Link } from "react-router-dom";
// import user from "../res/user.png";
// import logo from "../res/logo.png";
// import home from "../res/home.png";

// export default function Header(props) {
//   const { logout, currentUser } = useAuth();

//   return (
//     <Container>
//       <Logo src={logo} />
//       <HeadingContainer>Government Polytechnic Pen Portal</HeadingContainer>
//       <Spacer />
//       <UserContainer>
//         {currentUser && <UserImg src={user} />}
//         <h4>
//           {currentUser &&
//             (currentUser.displayName
//               ? currentUser.displayName
//               : currentUser.email)}
//         </h4>
//         {currentUser && (
//           <Link to={props.Home || "/profile"}>
//             <HomeIcon src={home} />
//           </Link>
//         )}
//       </UserContainer>
//       {currentUser && (
//         <Link
//           to="/logout"
//           onClick={async (e) => {
//             e.preventDefault();
//             await logout();
//           }}
//         >
//           <LogOutContainer>Log Out</LogOutContainer>
//         </Link>
//       )}
//     </Container>
//   );
// }

// const Container = styled.div`
//   display: flex;
//   position: fixed;
//   left: 0;
//   right: 0;
//   top: 0;
//   z-index: 20;
//   width: 100%;
//   height: 80px;
//   align-items: center;
//   justify-content: center;
//   background-color: #2155cd;
//   border: 1px solid transparent;
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
//   @media (max-width: 650px) {
//     height: 55px;
//   }
// `;

// const Logo = styled.img`
//   margin: 5px;
//   padding: 6px;
//   height: 94px;
//   width: 94px;
//   @media (max-width: 650px) {
//     display: none;
//   }
// `;

// const UserContainer = styled.div`
//   display: flex;
//   color: white;
//   justify-content: center;
//   align-items: center;
//   h4 {
//     font-familt: Ubuntu;
//     font-size: 15px;
//   }
//   @media (max-width: 650px) {
//     display: none;
//   }
// `;
// const HeadingContainer = styled.button`
//   font-family: Roboto Slab;
//   font-size: 1.7rem;
//   color: white;
//   padding-left: 12px;
//   img {
//     height: 24px;
//     width: 24px;
//   }
//   @media (max-width: 650px) {
//     font-size: 15px;
//   }
// `;

// const HomeIcon = styled.img`
//   height: 48px;
//   width: 49px;
//   margin-left: 12px;
//   transition: 150ms all;
//   padding: 6px;
//   cursor: pointer;

//   :hover {
//     border: 1px solid white;
//     border-radius: 30%;
//   }

//   @media (max-width: 650px) {
//     display: none;
//   }
// `;

// const LogOutContainer = styled.button`
//     height: 43px;
//     width: 100px;
//     color: white;
//     border:1px solid white;
//     background-color: #0AA1DD;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     border-radius: 10px;
//     margin-left: 20px;
//     margin-right: 10px;
//     transition: all 0.5s;
//     font-weight:bold;

//     :hover{
//       background-color:tomato;
//     }

//     @media (max-width:650px){
//       height: 35px;
//        width: 70px;
//        border-radius:5px;
//        font-size:12px;
//        margin-left:auto;
//     }

//   }
// `;

// const UserImg = styled.img`
//   height: 43px;
//   width: 44px;
//   margin-right: 10px;
// `;

import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";

export default function Header({ navItems }) {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const { currentUser, logout } = useAuth();
  return (
    <Box w="100%" h="12%" p={4} color="white">
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            TGMS System
          </Text>
        </Flex>

        {navItems && (
          <Stack direction={"row"} spacing={4}>
            {navItems.map((navItem) => (
              <Box key={navItem.label}>
                <Box
                  as="a"
                  p={2}
                  href={navItem.href ?? "#"}
                  fontSize={"sm"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                >
                  {navItem.label}
                </Box>
              </Box>
            ))}
          </Stack>
        )}

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {currentUser ? (
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              href={"#"}
              _hover={{
                bg: "pink.300",
              }}
              onClick={async (e) => {
                e.preventDefault();
                await logout();
              }}
            >
              Log Out
            </Button>
          ) : (
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              href={"#"}
              _hover={{
                bg: "pink.300",
              }}
            >
              Log In
            </Button>
          )}
        </Stack>
      </Flex>
    </Box>
  );
}
