import React, { useRef } from "react";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Center,useToast
} from "@chakra-ui/react";
import axios from "axios";

const ForgetPassword = () => {
 const emailInput = useRef();
 const toast = useToast()

 const handleSubmit = async (e) => {
   e.preventDefault();
   const token = localStorage.getItem("token");
   const response = await axios.post(
     "http://localhost:5000/users/sendEmailLink",
     {
       email: emailInput.current.value,
     },
     { headers: { Authorization: token } }
   );
   if (response.status === 200) {
     console.log(response);
      toast({
        title: "Reset link is sent.",
        description: "Reset your password from given link",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
   }
 };
 return (
   <Center>
     <form onSubmit={handleSubmit}>
       <FormControl id="email" isRequired pt={5}>
         <FormLabel>Email address</FormLabel>
         <Input type="email" placeholder="Enter your email" ref={emailInput} />
         <FormHelperText>
           We'll send password reset link to this email.
         </FormHelperText>
       </FormControl>
       <Button mt={4} colorScheme="blue" type="submit">
         Send link
       </Button>
     </form>
   </Center>
 );
}

export default ForgetPassword