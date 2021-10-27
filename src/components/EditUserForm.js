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
/** Form for editing a user.
 *
 * Props:
 * - editUser: call this to edit user in parent, takes in the formData
 * - users: array of user objects
 *
 * State:
 * - form: local state for each field on form
 * - error, showErrorText: booleans for form validation
 */
function EditUserForm({editUser, users}){
  const history = useHistory();
  const firstUser = users[0];
  const [form, setForm] = useState({
    user:`${firstUser.firstName} ${firstUser.lastName}`,
    firstName: firstUser.firstName,
    lastName: firstUser.lastName,
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
    if(name !== "user"){
      setForm(f => ({
        ...f,
        [name]: value
      }));
    } else {
      let user = users.find( user => value === `${user.firstName} ${user.lastName}`)
      setForm(f => ({
        [name]: value,
        firstName: user.firstName,
        lastName: user.lastName
      }));
    }
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    editUser(form);
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
        <Label for="user">User</Label>
        <Input
          type="select"
          name="user"
          id="user"
          onBlur={handleBlur}
          pattern="([A-z])\w+"
          style={errorStyle(error)}
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
        {showErrorText && (
          <p role="alert" style={{ color: "rgb(255, 0, 0)" }}>
            Only letters allowed in first and last names
          </p>
        )}
      </FormGroup>

      <FormGroup>
        <Label for="firstName">First Name</Label>
        <Input
          name="firstName"
          id="firstName"
          value={form.firstName}
          onChange={handleChange}
        />
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
        Edit User
      </Button>
    </Form>
  )
}

export default EditUserForm;