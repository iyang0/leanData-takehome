
import users from "./pseudo-backend/users";
import expenses from "./pseudo-backend/expenses";
import { useState, useEffect } from "react";
import TablesContainer from "./components/TablesContainer";

function App() {
  const companyExpense = {
    companyExpenses: [
      {
        category: "food", 
        totalExpenses: expenses.expenses
          .filter(e => e.category === "food")
          .map( e => e.cost)
          .reduce( (prevVal, currVal) => prevVal + currVal)
      },
      {
        category: "travel", 
        totalExpenses: expenses.expenses
          .filter(e => e.category === "travel")
          .map( e => e.cost)
          .reduce( (prevVal, currVal) => prevVal + currVal)
      },
      {
        category: "health", 
        totalExpenses: expenses.expenses
          .filter(e => e.category === "health")
          .map( e => e.cost)
          .reduce( (prevVal, currVal) => prevVal + currVal)
      },
      {
        category: "supplies", 
        totalExpenses: expenses.expenses
          .filter(e => e.category === "supplies")
          .map( e => e.cost)
          .reduce( (prevVal, currVal) => prevVal + currVal)
      }
    ]
  };
  const companyName="Company XYZ";
  const [tableData, setTableData] = useState([users, expenses, companyExpense])

  return (
    <div className="App">
      <TablesContainer tables={tableData} title={companyName}/>
    </div>
  );
}

export default App;
