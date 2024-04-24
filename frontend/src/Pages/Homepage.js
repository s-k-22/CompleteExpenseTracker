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

const Homepage = () => {
  const usernameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = usernameInput.current.value;
    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    const response = await axios.post("http://localhost:5000/users/signup", {
      username,
      email,
      password,
    });
    console.log(response);
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
            <Input
              type="text"
              // name="username"
              // defaultValue={username}
              ref={usernameInput}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              // name="email"
              // defaultValue={email}
              ref={emailInput}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              // name="password"
              // defaultValue={formData.password}
              ref={passwordInput}
            />
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

export default Homepage;
