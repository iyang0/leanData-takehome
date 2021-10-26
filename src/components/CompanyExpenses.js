import DataTable from "./DataTable";

function CompanyExpenses(){
  return (
    <div className="container">
      <div className="row">
      <header className="col-12 text-center">
        Company XYZ 
      </header>
        <div className="col">
          <DataTable/>
        </div>
        <div className="col">
          <DataTable/>
        </div>
        <div className="col">
          <DataTable/>
        </div>
      </div>
    </div>
  )
}

export default CompanyExpenses;