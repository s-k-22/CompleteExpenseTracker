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
import { useSelector, useDispatch } from "react-redux";
import {
  addExpense,
  deleteExpense,
  editExpense,
  getExpenses,
} from "../../store/expenseSlice";

const ExpensesForm = () => {
  const expensesRTK = useSelector((state) => state.expense.expenses);
  const dispatch = useDispatch();

  const idInput = useRef();
  const amtInput = useRef();
  const descInput = useRef();
  const catInput = useRef();

  const [isEdit, setIsEdit] = useState(false);

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expId = idInput.current.value;
    const amt = amtInput.current.value;
    const desc = descInput.current.value;
    const category = catInput.current.value;

    const data = { expId, amt, desc, category };

    if (!isEdit) dispatch(addExpense(data));
    else {
      dispatch(editExpense(data));
      setIsEdit(false);
      document.getElementById(expId).parentElement.parentElement.style.display =
        "";
    }

    idInput.current.value = "";
    amtInput.current.value = "";
    descInput.current.value = "";
    catInput.current.value = "";
  };

  useEffect(() => {
    dispatch(getExpenses());
  }, []);

  const editHandler = (e) => {
    console.log(e.target);
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
          {expensesRTK.map((item) => (
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

                    document.getElementById(
                      item.id
                    ).parentElement.parentElement.style.display = "none";

                    idInput.current.value = item.id;
                    amtInput.current.value = item.amount;
                    descInput.current.value = item.description;
                    catInput.current.value = item.category;
                  }}
                >
                  Edit
                </Button>

                <Button
                  colorScheme="red"
                  onClick={() => {
                    dispatch(deleteExpense(item.id));
                    dispatch(getExpenses());
                  }}
                >
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
