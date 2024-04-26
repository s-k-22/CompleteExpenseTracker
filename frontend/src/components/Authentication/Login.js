import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
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

const Login = () => {
  const emailInput = useRef();
  const passwordInput = useRef();

  const toast = useToast();
  const history = useHistory();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const email = emailInput.current.value;
      const password = passwordInput.current.value;

      const response = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      // console.log(response);
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        toast({
          title: "Login successful.",
          description: response.data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        history.replace("/dashboard");
      }
    } catch (error) {
      console.log(error.response.data.message);
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
          <Box textAlign="center">
            <Link to="/forgotPassword">Forgot password?</Link>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
