import React, { useState } from "react";
import { Box, Text, Button, Flex, Spacer, useToast } from "@chakra-ui/react";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";

const Header = () => {
  const [showDownloadBtn, setShowDownloadBtn] = useState(false);
  const history = useHistory();
  const toast = useToast();

  const token = useSelector((state) => state.auth.token);
  const expensesRTK = useSelector((state) => state.expense.expenses);

  const amount = expensesRTK
    .map((exp) => exp.amount)
    .reduce((acc, currentValue) => acc + currentValue, 0);

  const dispatch = useDispatch();

  const handleEmailVerification = async () => {
    const response = await axios.post(
      "http://localhost:5000/users/sendEmailLink",
      {
        email: "vaidehiagarwal138@gmail.com",
      },
      { headers: { Authorization: token } }
    );
    if (response.status === 200) {
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
    dispatch(authActions.logout());
    history.replace("/login");
  };

  const handlePremium = () => {
    setShowDownloadBtn(true);
  };

  const handleDownload = ()=>{
     function saveFile(blob, fileName) {
       const url = window.URL.createObjectURL(blob);
       const a = document.createElement("a");
       a.href = url;
       a.download = fileName;
       a.click();
     }

     let csvContent = "id,amount,description,category\n";
     expensesRTK.forEach((exp) => {
       let row =
         exp.id +
         "," +
         exp.amount +
         "," +
         exp.description +
         "," +
         exp.category +
         "\n";
       csvContent += row;
     });

     var data = new Blob([csvContent], { type: "text/csv" });
     saveFile(data, `expenses_${new Date()}.csv`);
  }

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
          onClick={handlePremium}
          isDisabled={amount < 10000 ? true : false}
        >
          Activate Premium
        </Button>

        {showDownloadBtn && <Button variant="ghost" color="white" mr={4} onClick={handleDownload}>
          Download File
        </Button>}

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
