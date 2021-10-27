import DataTable from "./DataTable";

/**
 * Company Expenses: container that displays tables
 * 
 * props: 
 * - tables: array of objects for a table
 * - company: string for company name
*/
function TablesContainer({tables, title}){
  return (
    <div className="container">
      <div className="row">
      <h1 className="col-12 text-center display-2">
        {title}
      </h1>
        {tables.map( table => (
          <div className="col" key={Object.keys(table)[0]}>
            <h3 className="text-center">{Object.keys(table)[0]}</h3>
            <DataTable table={table}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TablesContainer;