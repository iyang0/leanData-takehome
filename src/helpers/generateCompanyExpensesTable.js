/**
 * helper function to massage data for table usage,
 * takes in json of expenses
 * 
 * input:
 * {
 *  expenses: [
 *    {
 *      "fullName": string,
 *      "category": string,
 *      "description": string,
 *      "cost": num
 *   },
 *  ]
 * }
*/
export default function generateCompanyExpensesTable(expenses){
  const adder = (prevVal, currVal) => prevVal + currVal;
  //get totalExpenses by filtering expenses by category
  //and adding all the costs together.
  return ({
    companyExpenses: [
      {
        category: "food", 
        totalExpenses: expenses.expenses
          .filter(e => e.category === "food")
          .map( e => e.cost)
          .reduce( adder, 0)
      },
      {
        category: "travel", 
        totalExpenses: expenses.expenses
          .filter(e => e.category === "travel")
          .map( e => e.cost)
          .reduce( adder, 0)
      },
      {
        category: "health", 
        totalExpenses: expenses.expenses
          .filter(e => e.category === "health")
          .map( e => e.cost)
          .reduce( adder, 0)
      },
      {
        category: "supplies", 
        totalExpenses: expenses.expenses
          .filter(e => e.category === "supplies")
          .map( e => e.cost)
          .reduce( adder, 0)
      }
    ]
  });
}