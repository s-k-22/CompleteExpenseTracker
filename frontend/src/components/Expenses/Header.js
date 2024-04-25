import React from "react";
import { Box, Text, Button, Flex, Spacer } from "@chakra-ui/react";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Header = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.replace("/login");
  };
  return (
    <Box bg="blue.500" px={4} py={3}>
      <Flex alignItems="center">
        <Text fontSize="3xl" fontWeight="bold" color="white">
          Expense Tracker
        </Text>

        <Spacer />

        <ProfileModal />
        <Button variant="ghost" color="white" mr={4} onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
