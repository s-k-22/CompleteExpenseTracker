import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";

const Login = () => {
  const emailInput = useRef();
  const passwordInput = useRef();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const email = emailInput.current.value;
      const password = passwordInput.current.value;

      const response = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      console.log(response);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={8} borderWidth="1px" borderRadius="md">
      <Heading as="h2" size="xl" pb={5} textAlign="center">
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" ref={emailInput} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" ref={passwordInput} />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Login
          </Button>
          <Box textAlign="center">
            <Link to="/">Account does not exist? Sign up</Link>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
