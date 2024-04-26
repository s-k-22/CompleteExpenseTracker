import React from "react";
import { Box, Button, Stack, Text, Center } from "@chakra-ui/react";

const dummyExpenses = [
  {
    id: 1,
    amount: 50,
    description: "Lunch",
    category: "Food",
  },
  {
    id: 2,
    amount: 40,
    description: "Gasoline",
    category: "Petrol",
  },
  {
    id: 3,
    amount: 1000,
    description: "Monthly ",
    category: "Salary",
  },
  {
    id: 4,
    amount: 20,
    description: "Snacks",
    category: "Food",
  },
];

const ExpensesList = () => {
  return (
    <Center>
      <Stack pt={5}>
        {dummyExpenses.map((item) => (
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
              <Button colorScheme="blue" mr={2}>
                Edit
              </Button>

              <Button colorScheme="red">Delete</Button>
            </Box>
          </Box>
        ))}
      </Stack>
    </Center>
  );
};

export default ExpensesList;
