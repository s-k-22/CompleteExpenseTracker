import React from "react";
import { Box, Text, Button, Flex, Spacer,useToast } from "@chakra-ui/react";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";

const Header = () => {
  const history = useHistory();
  const toast = useToast()

  const handleEmailVerification = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:5000/users/sendEmailLink",
      {
        email: "vaidehiagarwal138@gmail.com",
      },
      { headers: { Authorization: token } }
    );
    if(response.status===200){
    toast({
      title: "Verification link sent.",
      description: "verification link is sent to registered email",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  }
  };

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
        <Button
          variant="ghost"
          color="white"
          mr={4}
          onClick={handleEmailVerification}
        >
          Verify Email
        </Button>
        <Button variant="ghost" color="white" mr={4} onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
