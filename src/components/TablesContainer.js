import { Container, Row, Col } from "reactstrap";
import DataTable from "./DataTable";
import { v4 as uuid } from "uuid";

/**
 * Company Expenses: container that displays tables
 * 
 * props: 
 * - tables: array of objects for a table
 * - company: string for company name
*/
function TablesContainer({tables, title}){
  return (
    <Container>
      <Row>
      <h1 className="col-12 text-center display-2">
        {title}
      </h1>
        {tables.map( table => (
          <Col key={uuid()}>
            <h3 className="text-center">{Object.keys(table)[0]}</h3>
            <DataTable table={table}/>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default TablesContainer;