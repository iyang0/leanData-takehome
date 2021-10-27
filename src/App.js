import expenses from "./pseudo-backend/expenses";
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import TablesContainer from "./components/TablesContainer";
import NavBar from "./components/NavBar";
import AddUserForm from "./components/AddUserForm";
import EditUserForm from "./components/EditUserForm";
import DeleteUserForm from "./components/DeleteUserForm";
import AddExpenseForm from "./components/AddExpenseForm";
import EditExpenseForm from "./components/EditExpenseForm";
import DeleteExpenseForm from "./components/DeleteExpenseForm";
import generateCompanyExpensesTable from "./helpers/generateCompanyExpensesTable";
import generateUsersTable from "./helpers/generateUsersTable";

/**
 * App: container for all the other components, app state logic here
 * 
 * I am realizing that I should have used IDs even if not asked for in the pseudo backend data 
 * and just not shown that on tables as that would have made it a lot easier and performant
 * than using find and getting the indexes. A bit too late for me to refactor in time though.
 * 
 * states:
 * - expensesTable: the exact same as the seed data from pseudo backend
 * - usersTable: the same as seed data but with total expense for each user 
 * - companyExpenseTable: object formatted same as seed data, derived from expenses.
 * - tableData: the table states together as an array
*/
function App() {
  const companyName="Company XYZ";
  const [companyExpenseTable, setCompanyExpenseTable] = useState(
    generateCompanyExpensesTable(expenses)
  );
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
    let [firstName, lastName] = formData.user.split(" ");
    let users = [...usersTable.users];
    let userIdx = users.findIndex( user => (
      user.firstName === firstName && user.lastName === lastName
      ));
    users.splice(userIdx,1);
    setUsersTable({users});
    
    let expenses = [...expensesTable.expenses];
    let delIdx = [];
    //I know this is horrible O(n^2) runtime, I just want this to work first
    expenses.forEach( (e, idx) => {
      if(e.fullName === formData.user) {
        delIdx.push(idx);
      }
    });
    for(let i = delIdx.length-1; i>=0; i--){
      expenses.splice(delIdx[i],1);
    }
    setExpensesTable({expenses});
    setCompanyExpenseTable(generateCompanyExpensesTable({expenses}));
  }

  //add expense logic
  async function addExpense(formData) {
    let expenses = [...expensesTable.expenses, {...formData}];
    setExpensesTable({expenses});
    
    let [firstName, lastName] = formData.fullName.split(" ");
    let users = [...usersTable.users];
    let userIdx = users.findIndex( user => (
      user.firstName === firstName && user.lastName === lastName
      ));
    users[userIdx] = {
      firstName, 
      lastName, 
      totalExpenses: (users[userIdx].totalExpenses+formData.cost)}
    setUsersTable({users});
    setCompanyExpenseTable(generateCompanyExpensesTable({expenses}));
  }

  //edit expense logic
  async function editExpense(formData) {
    console.log("hello")
  }

  //delete expense logic
  async function deleteExpense(formData) {
    const expenseIdx = formData.expenseIdx;
    let expenses = [...expensesTable.expenses];
    const [firstName, lastName] = expenses[expenseIdx].fullName.split(" ");
    const cost = expenses[expenseIdx].cost;
    expenses.splice(expenseIdx,1);
    setExpensesTable({expenses});

    let users = [...usersTable.users];
    const userIdx = users.findIndex( user => (
      user.firstName === firstName && user.lastName === lastName
      ));
    users[userIdx] = {firstName, lastName, totalExpenses: (users[userIdx].totalExpenses-cost)}
    setUsersTable({users});
    setCompanyExpenseTable(generateCompanyExpensesTable({expenses}));
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

          <Route path="/addExpense">
            <AddExpenseForm addExpense={addExpense} users={usersTable.users} />
          </Route>

          <Route path="/editExpense">
            <EditExpenseForm 
              editExpense={editExpense} 
              expenses={expensesTable.expenses} 
              users={usersTable.users} />
          </Route>
          
          <Route path="/deleteExpense">
            <DeleteExpenseForm deleteExpense={deleteExpense} expenses={expensesTable.expenses} />
          </Route>

        </Switch>
      </main>
    </div>
  );
}

export default App;
