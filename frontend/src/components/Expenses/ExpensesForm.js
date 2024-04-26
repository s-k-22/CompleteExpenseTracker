import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Flex,
  FormControl,
  Input,
  Select,
  Button,
  useToast,
  Text,
  Center,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";

const ExpensesForm = () => {
  const idInput = useRef();
  const amtInput = useRef();
  const descInput = useRef();
  const catInput = useRef();

  const [expenses, setExpenses] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const expId = idInput.current.value;
    const amt = amtInput.current.value;
    const desc = descInput.current.value;
    const category = catInput.current.value;

    if (!isEdit) {
      const response = await axios.post(
        "http://localhost:5000/expenses/addExpense",
        { expId, amt, desc, category },
        { headers: { Authorization: token } }
      );
      console.log(response);
      if (response.status === 201) {
        toast({
          title: "Expense added.",
          description: "Expense is added successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setExpenses([...expenses, response.data]);
      }
    } else {
      const response = await axios.put(
        `http://localhost:5000/expenses/editExpense`,
        { expId, amt, desc, category },
        { headers: { Authorization: token } }
      );
      console.log(response);
      if (response.status === 201) {
        toast({
          title: "Expense updated.",
          description: "Expense is updated successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        window.location.reload();
      }
    }
  };

  const getExpenses = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:5000/expenses/getExpenses",
      { headers: { Authorization: token } }
    );
    // console.log(response.data);
    setExpenses([...expenses, ...response.data]);
  };

  useEffect(() => {
    getExpenses();
  }, []);

  const handleDelete = async (e) => {
    const id = e.target.id;
    const response = await axios.delete(
      `http://localhost:5000/expenses/deleteExpense/${id}`
    );
    console.log(response);
    toast({
      title: "Expense deleted.",
      description: "Expense is delete successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    const filteredExp = expenses.filter((exp) => exp.id !== id);
    setExpenses(filteredExp);
  };

  return (
    <>
      <Box p={4}>
        <Flex alignItems="center">
          <FormControl mr={4} flex="1">
            <Input type="text" id="id" placeholder="Enter id" ref={idInput} />
          </FormControl>
          <FormControl mr={4} flex="1">
            <Input
              type="number"
              id="amount"
              placeholder="Enter amount"
              ref={amtInput}
            />
          </FormControl>
          <FormControl mr={4} flex="1">
            <Input
              type="text"
              id="description"
              placeholder="Enter description"
              ref={descInput}
            />
          </FormControl>
          <FormControl mr={4} flex="1">
            <Select id="category" placeholder="Select category" ref={catInput}>
              <option value="petrol">Petrol</option>
              <option value="salary">Salary</option>
              <option value="food">Food</option>
            </Select>
          </FormControl>
          <Button colorScheme="blue" type="submit" onClick={handleSubmit}>
            {!isEdit ? "Add Expense" : "Update Expense"}
          </Button>
        </Flex>
      </Box>

      <Center>
        <Stack pt={5}>
          {expenses.map((item) => (
            <Box
              key={item.id}
              width="500px"
              display="flex"
              justifyContent="space-between"
              boxShadow="base"
              p="6"
              rounded="md"
              bg="white"
            >
              <Box>
                <Text>
                  <b>${item.amount}</b>
                </Text>
                <Text>{item.description}</Text>
              </Box>
              <Box>
                <Text>
                  <i>{item.category}</i>
                </Text>
              </Box>
              <Box>
                <Button
                  colorScheme="blue"
                  mr={2}
                  id={item.id}
                  onClick={() => {
                    setIsEdit(true);
                    idInput.current.value = item.id;
                    amtInput.current.value = item.amount;
                    descInput.current.value = item.description;
                    catInput.current.value = item.category;
                    const filteredExp = expenses.filter(
                      (exp) => exp.id !== item.id
                    );
                    setExpenses(filteredExp);
                  }}
                >
                  Edit
                </Button>

                <Button colorScheme="red" onClick={handleDelete} id={item.id}>
                  Delete
                </Button>
              </Box>
            </Box>
          ))}
        </Stack>
      </Center>
    </>
  );
};

export default ExpensesForm;
