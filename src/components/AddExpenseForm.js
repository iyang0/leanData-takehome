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
/** Form for adding an Expense.
 *
 * Props:
 * - addExpense: call this to add user in parent
 *
 * State:
 * - local state for each field on form
 */
function AddExpenseForm({addExpense, users, expenses}){
  const history = useHistory();
  const [form, setForm] = useState({
    "fullName": "",
    "category": "",
    "description": "",
    "cost": 0
  });

  const handleChange = evt => {
    const { name, value } = evt.target;
    setForm(f => ({
      ...f,
      [name]: value
    }));
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    addExpense(form);
    history.push("/");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="fullName">Full Name</Label>
        <Input
          type="select"
          name="fullName"
          id="fullName"
          value={form.fullName}
          onChange={handleChange}
        >
          {users.map(user => (
            <option 
              value={`${user.firstName} ${user.lastName}`}
              key={uuid()}
            >
              {`${user.firstName} ${user.lastName}`}
            </option>
          ))}
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="user">User</Label>
        <Input
          type="select"
          name="user"
          id="user"
          value={form.user}
          onChange={handleChange}
        >
          {users.map(user => (
            <option 
              value={`${user.firstName} ${user.lastName}`}
              key={uuid()}
            >
              {`${user.firstName} ${user.lastName}`}
            </option>
          ))}
        </Input>
      </FormGroup>

      <Button>
        Add Expense
      </Button>
    </Form>
  )
}

export default AddExpenseForm;