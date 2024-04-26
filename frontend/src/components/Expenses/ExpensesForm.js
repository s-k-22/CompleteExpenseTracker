import React from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";

const ExpensesForm = () => {
  return (
    <Box p={4}>
      <Flex alignItems="center">
        <FormControl mr={4} flex="1">
          <Input type="text" id="id" placeholder="Enter id" />
        </FormControl>
        <FormControl mr={4} flex="1">
          <Input type="number" id="amount" placeholder="Enter amount" />
        </FormControl>
        <FormControl mr={4} flex="1">
          <Input type="text" id="description" placeholder="Enter description" />
        </FormControl>
        <FormControl mr={4} flex="1">
          <Select id="category" placeholder="Select category">
            <option value="petrol">Petrol</option>
            <option value="salary">Salary</option>
            <option value="food">Food</option>
          </Select>
        </FormControl>
        <Button colorScheme="blue">Add Expense</Button>
      </Flex>
    </Box>
  );
};

export default ExpensesForm;
