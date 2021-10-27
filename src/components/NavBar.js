import React from "react";
import { Button, 
  ButtonDropdown, 
  Dropdown, 
  Nav, 
  NavItem, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem } from "reactstrap";
import { useState } from "react";

/**
 * Navbar that routes to home and form to add/edit/delete users or expenses
 * 
 * states:
 * - dropdownUserOpen: boolean, whether dropdown for user is open
 * - dropdownExpenseOpen: boolean, whether dropdown for expense is open
*/
function NavBar() {
  const [dropdownUserOpen, setUserOpen] = useState(false);
  const [dropdownExpenseOpen, setExpenseOpen] = useState(false);
  const toggleUser = () => setUserOpen(!dropdownUserOpen);
  const toggleExpense = () => setExpenseOpen(!dropdownExpenseOpen);

  return (
    <div className="bg-dark">
      <Nav>
        <NavItem>
          <Dropdown>
            <ButtonDropdown isOpen={dropdownUserOpen} toggle={toggleUser}>
              <DropdownToggle caret outline color="info">
                Users
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  Add
                </DropdownItem>
                <DropdownItem>
                  Edit
                </DropdownItem>
                <DropdownItem>
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </Dropdown>
        </NavItem>
        <NavItem>
        <Dropdown>
            <ButtonDropdown isOpen={dropdownExpenseOpen} toggle={toggleExpense}>
              <DropdownToggle caret outline color="info">
                Expenses
              </DropdownToggle>
              <DropdownMenu>
              <DropdownItem>
                  Add
                </DropdownItem>
                <DropdownItem>
                  Edit
                </DropdownItem>
                <DropdownItem>
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </Dropdown>
        </NavItem>
      </Nav>
    </div>
  );
}

export default NavBar;