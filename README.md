# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Takehome instructions

Time to complete: 24 hour after receiving this project detail

### Summary

Create a single page application containing 3 tables that allow you to input/modify users, input/modify expenses for each user, and display a summary of expenses by category. You are allowed to use any frontend framework and library to complete this assignment.

### Page Setup

- "Users" Table columns: First Name, Last Name, Total Expenses
- "Expense" Table columns: Full Name, Category, Description, Cost
- "Company Expenses" table columns: Category, Total Expenses

### Required Functionality

- Add/Edit/Delete users for the User Table
  - When adding a new user or editing an existing user:
    - First Name and Last Name will be a standard input box
  - Total Expenses will not be editable in any case. This will be a text field that displays the sum of expenses for this user
  - When deleting a user, the data/information in the other 2 tables should be updated as well
  - All row inputs must be valid before Add/Edit actions on a table row are submitted


- Add/Edit/Delete expense entries for the Expense Table
  - When adding/editing an expense:
    - Full Name will be a dropdown of users available in the users table
    - Category will be a dropdown of the following options: Food, Travel, Health, Supplies
    - Description will be a standard text input box
    - Cost will be a standard input box
  - When deleting an expense, the data/information in the other 2 tables should be updated as well
  - All row inputs must be valid before Add/Edit actions on a table row are submitted

- Company Expenses is a read-only table and will only display the sum of each expense category

### Optional/Bonus Functionality

- Add another column to the Users table that sets a total budget for a user
  - If you try to add an expense or edit an expense that would result in the user exceeding their budget, prevent saving the expense entry and throw an error message on the page
- Add a dropdown filter that allows you to select a specific user. This will filter all the data on the page to show only relevant information related to the selected user.
- Add a dropdown filter that allows you to select a specific expense category. This will filter all the data on the page to show only relevant information related to the selected expense category.

### Notes

Consider the case where hundreds of thousands of user and expense data is being retrieved from the backend. Structure the page and data structure accordingly to handle large amounts of data
You do not need to create a backend database that retains the data entered. A page refresh can clear the data. However, you should structure your data in a way that allows you to send/receive data from a backend database properly.


