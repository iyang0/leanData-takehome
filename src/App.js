import expenses from "./pseudo-backend/expenses";
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import TablesContainer from "./components/TablesContainer";
import NavBar from "./components/NavBar";
import AddUserForm from "./components/AddUserForm";
import EditUserForm from "./components/EditUserForm";
import DeleteUserForm from "./components/DeleteUserForm";
import generateCompanyExpensesTable from "./helpers/generateCompanyExpensesTable";
import generateUsersTable from "./helpers/generateUsersTable";

/**
 * App: container for all the other components, app state logic here
 * 
 * states:
 * - expensesTable: the exact same as the seed data from pseudo backend
 * - usersTable: the same as seed data but with total expense for each user 
 * - companyExpenseTable: object formatted same as seed data, derived from expenses.
 * - tableData: the table states together as an array
*/
function App() {
  const companyName="Company XYZ";
  const [companyExpenseTable, setCompanyExpenseTable] = useState(generateCompanyExpensesTable());
  const [usersTable, setUsersTable] = useState(generateUsersTable());
  const [expensesTable, setExpensesTable] = useState(expenses);
  const [tableData, setTableData] = useState([
    usersTable, 
    expensesTable, 
    companyExpenseTable
  ]);

  //rerender whenever users, expenses, or companyExpenses updates
  useEffect(function(){
    setTableData([
      usersTable, 
      expensesTable, 
      companyExpenseTable
    ])
  },[companyExpenseTable, expensesTable, usersTable])

  async function addUser(formData) {
    // the data from form could be added to users in database like below
    // await addUserApi(formData);
    let users = [...usersTable.users, {...formData, totalExpenses:0}];
    setUsersTable({users});
  }

  //edit user logic
  async function editUser(formData) {
    let oldName = formData.user;
    let [oldFirstName, oldLastName] = oldName.split(" ");
    let users = [...usersTable.users];
    let userIdx = users.findIndex( user => (
        user.firstName === oldFirstName && user.lastName === oldLastName
      ));
    users[userIdx].firstName = formData.firstName;
    users[userIdx].lastName = formData.lastName;
    setUsersTable({users});

    let expenses = [...expensesTable.expenses];
    expenses.forEach( e => {
      if(e.fullName === formData.user) {
        e.fullName = `${formData.firstName} ${formData.lastName}`
      }
    });
    setExpensesTable({expenses});
  }

  //delete user logic
  async function deleteUser(formData) {
    console.log("in delete user");
  }
  
  return (
    <div className="App">
      <NavBar title={companyName}/>
      <main>
        <Switch>
          <Route exact path="/">
            <TablesContainer tables={tableData} title={companyName}/>
          </Route>

          <Route path="/addUser">
            <AddUserForm addUser={addUser} />
          </Route>

          <Route path="/editUser">
            <EditUserForm editUser={editUser} users={usersTable.users}/>
          </Route>

          <Route path="/deleteUser">
            <DeleteUserForm deleteUser={deleteUser} users={usersTable.users}/>
          </Route>
          
        </Switch>
      </main>
    </div>
  );
}

export default App;
