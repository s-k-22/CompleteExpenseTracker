import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
  Avatar,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

const ProfileModal = (props) => {
  const token = useSelector((state) => state.auth.token);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fullName, setFullName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const toast = useToast();

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    const response = await axios.get(
      "http://localhost:5000/users/updateProfile",
      { headers: { Authorization: token } }
    );

    if (response.status === 200) {
      setFullName(response.data.fullName);
      setProfilePhoto(response.data.profilePhoto);
    } else {
      setFullName("");
      setProfilePhoto("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:5000/users/updateProfile",
      { fullName, profilePhoto },
      { headers: { Authorization: token } }
    );
    toast({
      title: "Profile updated.",
      description: "Profile is updated successfully.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };
  return (
    <>
      <Box>
        <Flex alignItems="center" as={Button} variant="ghost" onClick={onOpen}>
          <Avatar size="sm" />
          <Text ml={2} color="white">
            My Profile
          </Text>
        </Flex>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  defaultValue={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Profile Photo Link</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter profile photo link"
                  defaultValue={profilePhoto}
                  onChange={(e) => setProfilePhoto(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                Update Profile
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default ProfileModal;
