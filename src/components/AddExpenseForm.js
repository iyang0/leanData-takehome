import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import errorStyle from "../helpers/errorStyle";
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
 * - form: local state for each field on form
 * - error, showErrorText: booleans for form validation
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
  const [error, setError] = useState(false);
  const [showErrorText, setShowErrorText] = useState(false);

  const handleChange = evt => {
    const newValueIsValid = !evt.target.validity.patternMismatch;
    if (error) {
      if (newValueIsValid) {
        setError(false);
        setShowErrorText(false);
      }
    }
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

  const handleBlur = evt => {
    if (!error) {
      if (evt.target.validity.patternMismatch) {
        setError(true);
        setShowErrorText(true);
      }
    }
    if (error) {
      setShowErrorText(false);
    }
  };

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
          name="cost"
          id="cost"
          onBlur={handleBlur}
          pattern="^[^0]\d+"
          style={errorStyle(error)}
          value={form.cost}
          onChange={handleChange}
        />
        {showErrorText && (
          <p role="alert" style={{ color: "rgb(255, 0, 0)" }}>
            You must put in a number greater than 0
          </p>
        )}
      </FormGroup>

      <Button>
        Add Expense
      </Button>
    </Form>
  )
}

export default AddExpenseForm;