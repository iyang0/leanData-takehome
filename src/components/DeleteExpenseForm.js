import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
/** Form for deleting an Expense.
 *
 * Props:
 * - deleteExpense: call this to add user in parent
 * - expense: array of expense objects
 *
 * State:
 * - local state for each field on form
 */
function DeleteExpenseForm({deleteExpense, expenses}){
  const history = useHistory();
  const [form, setForm] = useState({
    "expenseIdx": 0,
    "expense": `${expenses[0].fullName}_${expenses[0].category}_${expenses[0].description}_${expenses[0].cost}`
  });

  const handleChange = evt => {
    const { name, value } = evt.target;
    setForm(f => ({
      [name]: Number(value),
      "expense": `${expenses[value].fullName}_${expenses[value].category}_${expenses[value].description}_${expenses[value].cost}`
    }));
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    deleteExpense(form);
    history.push("/");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup tag="fieldset">
      {expenses.map( (expense, idx) => (
        <div key={uuid()}>
          <Label for="expenseIdx">{`${expense.fullName}_${expense.category}_${expense.description}_${expense.cost}`}</Label>
          <Input
            id={idx}
            type="radio"
            name="expenseIdx"
            value={idx}
            checked={form.expenseIdx === idx}
            onChange={handleChange}
          ></Input>
        </div>
      ))}
      </FormGroup>

      <Button>
        Delete Expense
      </Button>
    </Form>
  )
}

export default DeleteExpenseForm;