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
 * - users: array of user objects
 *
 * State:
 * - local state for each field on form
 */
function AddExpenseForm({addExpense, users}){
  const history = useHistory();
  const categories = ["food", "travel", "health", "supplies"];
  const [form, setForm] = useState({
    "fullName": `${users[0].firstName} ${users[0].lastName}`,
    "category": categories[0],
    "description": "",
    "cost": 0
  });

  const handleChange = evt => {
    const { name, value } = evt.target;
    if(name==="cost"){
      setForm(f => ({
        ...f,
        [name]: Number(value)
      }));
    } else {
      setForm(f => ({
        ...f,
        [name]: value
      }));
    }
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
        <Label for="category">Category</Label>
        <Input
          type="select"
          name="category"
          id="category"
          value={form.category}
          onChange={handleChange}
        >
          {categories.map( category => (
            <option 
              value={category}
              key={uuid()}
            >
              {category}
            </option>
          ))}
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="description">Description</Label>
        <Input
          name="description"
          id="description"
          value={form.description}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <Label for="cost">Cost</Label>
        <Input
          type="number"
          name="cost"
          id="cost"
          value={form.cost}
          onChange={handleChange}
        />
      </FormGroup>

      <Button>
        Add Expense
      </Button>
    </Form>
  )
}

export default AddExpenseForm;