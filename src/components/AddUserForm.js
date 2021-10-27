import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
 * - local state for each field on form
 */
function AddUserForm({addUser}){
  const history = useHistory();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
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
    addUser(form);
    history.push("/");
  }

  return (
    <Form onSubmit={handleSubmit}>
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
          value={form.lastName}
          onChange={handleChange}
        />
      </FormGroup>

      <Button>
        Add User
      </Button>
    </Form>
  )
}

export default AddUserForm;