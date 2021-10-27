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
/** Form for editing a user.
 *
 * Props:
 * - editUser: call this to edit user in parent, takes in the formData
 * - users: array of user objects
 *
 * State:
 * - local state for each field on form
 */
function DeleteUserForm({deleteUser, users}){
  const history = useHistory();
  const firstUser = users[0];
  const [form, setForm] = useState({
    user:`${firstUser.firstName} ${firstUser.lastName}`
  });

  const handleChange = evt => {
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
    deleteUser(form);
    history.push("/");
  }

  return (
    <Form onSubmit={handleSubmit}>
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
        Delete User
      </Button>
    </Form>
  )
}

export default DeleteUserForm;