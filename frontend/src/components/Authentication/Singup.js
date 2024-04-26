import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const Signup = () => {
  const usernameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();

  const toast = useToast();
  const history = useHistory();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const username = usernameInput.current.value;
      const email = emailInput.current.value;
      const password = passwordInput.current.value;

      const response = await axios.post("http://localhost:5000/users/signup", {
        username,
        email,
        password,
      });
      if (response.status === 201) {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        history.replace("/login");
      }
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: error.response.data.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={8} borderWidth="1px" borderRadius="md">
      <Heading as="h2" size="xl" pb={5} textAlign="center">
        Sign Up
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input type="text" ref={usernameInput} />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" ref={emailInput} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" ref={passwordInput} />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Sign Up
          </Button>
          <Box textAlign="center">
            <Link to="/login">Already have an account? Log in</Link>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default Signup;
