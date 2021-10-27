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
/** Form for editing an Expense.
 *
 * Props:
 * - editExpense: call this to add user in parent
 * - expense: array of expense objects
 *
 * State:
 * - form: local state for each field on form
 * - error, showErrorText: booleans for form validation
 */
function EditExpenseForm({editExpense, expenses, users}){
  const history = useHistory();
  const categories = ["food", "travel", "health", "supplies"];
  const firstExpense = expenses[0];
  const [form, setForm] = useState({
    "expenseIdx": 0,
    "fullName": firstExpense.fullName,
    "category": firstExpense.category,
    "description": firstExpense.description,
    "cost": firstExpense.cost
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
    if(name === "expenseIdx" ){
      setForm(f => ({
        [name]: Number(value),
        "fullName": expenses[value].fullName,
        "category": expenses[value].category,
        "description": expenses[value].description,
        "cost": expenses[value].cost
      }));
    } else if(name === "cost") {
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
    editExpense(form);
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
        Edit Expense
      </Button>
    </Form>
  )
}

export default EditExpenseForm;