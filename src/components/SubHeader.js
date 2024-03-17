import React from "react";
import {
  useDisclosure,
  Box,
  Flex,
  HStack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

function SubHeader({ subNavItems, loadRoute }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const NavLink = (props) => {
    const { children } = props;

    return (
      <Box
        as="a"
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
          textDecoration: "none",
          bg: useColorModeValue("gray.200", "gray.700"),
        }}
        onClick={() => loadRoute(children)}
      >
        {children}
      </Box>
    );
  };

  return (
    <Box width={"100%"} px={8}>
      <Flex h={10} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <IoClose /> : <IoMenu />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {subNavItems.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
}

export default SubHeader;
