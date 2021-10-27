import React from "react";
import { Table } from "reactstrap";
/**
 * Data Table: Component to display a table of given information
 * 
 * props: 
 * - table: array of objects for a table
 * {
 *  tableName:
 *    [{col1: data1, col2: data2, ...}, ...]
 * }
*/
function DataTable({table}){
  if(Object.keys(table).length<1){
    return (
      <Table>
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
          <tr>
          </tr>
        </tbody>
      </Table>
    )
  }

  const tableName = Object.keys(table)[0];
  const rows = table[tableName];
  const columnNames = rows[0] ? Object.keys(rows[0]) : [];

  return (
      <Table>
        <thead>
          <tr>
            {
              columnNames.map( column => (
                <th key={`${tableName}-${column}`}>
                  {column}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            rows.map( (row, idx) => (
              <tr key={`${tableName}-${idx}`}>
                {
                  Object.keys(row).map( e => (
                    <td key={`${tableName}-${idx}-${e}`}>
                      {row[e]}
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </Table>
  )
}

export default DataTable;