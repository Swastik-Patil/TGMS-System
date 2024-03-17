import { Box, Flex, Button, Stack, useColorModeValue } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import Logo from "../res/Logo.webp";

export default function Header({ navItems }) {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const { currentUser, logout } = useAuth();
  //Logo Click Redirection
  function handleredirect() {
    let usertype = window.localStorage.getItem("usertype");
    if (usertype === "Student" && window.location.pathname !== "/home") {
      window.location.href = "/home";
    }
    if (
      usertype === "Teacher Guardian" &&
      window.location.pathname !== "/TGHome"
    ) {
      window.location.href = "/TGHome";
    }
    if (
      usertype === "Class Coordinator" &&
      window.location.pathname !== "/CCHome"
    ) {
      window.location.href = "/CCHome";
    }
    if (
      usertype === "Teacher Guardian Coordinator" &&
      window.location.pathname !== "/TGCHome"
    ) {
      window.location.href = "/TGCHome";
    }
    if (usertype === "Admin" && window.location.pathname !== "/AdminHome") {
      window.location.href = "/AdminHome";
    }
    if (usertype === "Select an option") {
      window.location.href = "/home";
    }
  }
  return (
    <Box w="100%" p={4} color="white" id="header">
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
          <img
            src={Logo}
            alt="TGMS"
            height="50"
            width="120"
            style={{ cursor: "pointer" }}
            onClick={handleredirect}
          />
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
        {currentUser && (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"#35c3fe"}
              href={"#"}
              _hover={{
                bg: "blue.300",
              }}
              onClick={async (e) => {
                e.preventDefault();
                logout();
                window.sessionStorage.clear();
                window.localStorage.clear();
              }}
            >
              Log Out
            </Button>
          </Stack>
        )}
      </Flex>
    </Box>
  );
}
