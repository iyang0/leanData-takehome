import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import errorStyle from "../helpers/errorStyle";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
/** Form for adding a user.
 *
 * Props:
 * - addUser: call this to add user in parent
 *
 * State:
 * - form: local state for each field on form
 * - error, showErrorText: booleans for form validation
 */
function AddUserForm({addUser}){
  const history = useHistory();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
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
    setForm(f => ({
      ...f,
      [name]: value
    }));
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    addUser(form);
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
        <Label for="firstName">First Name</Label>
        <Input
          name="firstName"
          id="firstName"
          onBlur={handleBlur}
          pattern="([A-z])\w+"
          style={errorStyle(error)}
          value={form.firstName}
          onChange={handleChange}
        />
        {showErrorText && (
          <p role="alert" style={{ color: "rgb(255, 0, 0)" }}>
            Only letters allowed in first and last names
          </p>
        )}
      </FormGroup>

      <FormGroup>
        <Label for="lastName">Last Name</Label>
        <Input
          name="lastName"
          id="lastName"
          onBlur={handleBlur}
          pattern="([A-z])\w+"
          style={errorStyle(error)}
          value={form.lastName}
          onChange={handleChange}
        />
        {showErrorText && (
          <p role="alert" style={{ color: "rgb(255, 0, 0)" }}>
            Only letters allowed in first and last names
          </p>
        )}
      </FormGroup>

      <Button>
        Add User
      </Button>
    </Form>
  )
}

export default AddUserForm;