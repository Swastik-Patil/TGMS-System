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

export default function Header({ navItems, noLogin }) {
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
            fontSize={"lg"}
            color={useColorModeValue("gray.800", "white")}
            cursor={"pointer"}
            onClick={() => {
              window.location.href = "/profile";
            }}
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
        {!noLogin && (
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
                bg={"#35c3fe"}
                href={"#"}
                _hover={{
                  bg: "blue.300",
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
                bg={"blue.400"}
                href={"#"}
                _hover={{
                  bg: "blue.300",
                }}
              >
                Log In
              </Button>
            )}
          </Stack>
        )}
      </Flex>
    </Box>
  );
}
