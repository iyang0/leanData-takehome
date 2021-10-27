import expenses from "./pseudo-backend/expenses";
import React, { useState } from "react";
import TablesContainer from "./components/TablesContainer";
import NavBar from "./components/NavBar";
import generateCompanyExpensesTable from "./helpers/generateCompanyExpensesTable";
import generateUsersTable from "./helpers/generateUsersTable";

/**
 * App: container for all the other components
 * 
 * states:
 * - expensesTable: the exact same as the seed data from pseudo backend
 * - usersTable: the same as seed data but with total expense for each user 
 * - companyExpenseTable: object formatted same as seed data, derived from expenses.
 * - tableData: the table states together as an array
*/
function App() {
  const companyName="Company XYZ";
  
  //get totalExpenses by filtering expenses by category, and adding all the costs together.
  const [companyExpenseTable, setCompanyExpenseTable] = useState(generateCompanyExpensesTable());
  //users need to map over each user and add totalExpense by user
  const [usersTable, setUsersTable] = useState(generateUsersTable());
  const [expensesTable, setExpensesTable] = useState(expenses);
  const [tableData, setTableData] = useState([
    usersTable, 
    expensesTable, 
    companyExpenseTable
  ])

  return (
    <div className="App">
      <NavBar/>
      <TablesContainer tables={tableData} title={companyName}/>
    </div>
  );
}

export default App;
