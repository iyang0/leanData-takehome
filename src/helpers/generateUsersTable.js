import users from "../pseudo-backend/users";
import expenses from "../pseudo-backend/expenses";

/**
 * helper function to massage data for table usage
 * Could have derived from expenses data, 
 * but if this app was actually connected to a backend,
 * would likely have separate data for users than expenses.
*/
export default function generateUsersTable(){
  const adder = (prevVal, currVal) => prevVal + currVal;
  //users need to map over each user and add totalExpense by user
  return (
    {
      users: users.users.map( user => ({...user, 
        totalExpenses: expenses.expenses
          .filter( e => e.fullName === `${user.firstName} ${user.lastName}` )
          .map( e => e.cost)
          .reduce( adder, 0)
      }))
    }
  );
}

