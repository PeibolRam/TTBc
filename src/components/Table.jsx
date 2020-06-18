import React from 'react'
import { Link } from 'react-router-dom'

const Table = (props) => {
  const { headers, rows } = props
  return (
    <div>
      <table className="table table-bordered table-hover">
      <TableHeader headers={headers}></TableHeader>
      <TableBody headers={headers} rows={rows}></TableBody>
      </table>
    </div>
  )
}

const TableHeader = (props) => {
  const { headers } = props
  headers.push('Editar')
  headers.push('Ver certificado')
  return(
    <thead className="thead-dark" key="header-1">
        <tr key="header-0">
          { headers && headers.map((value, index) => {
              return <th key={index}>
                <div>
                    {
                      (value === 'ownerName' ? value = 'Propietario' : value) &&
                      (value === 'ownerWallet' ? value = 'Wallet del Propietario' : value) &&
                      (value === 'ubicacion' ? value = 'Dirección del Inmueble' : value)
                    }
                  </div>
              </th>
          })}
        </tr>
    </thead>
  )
}

const TableBody = (props) => {
  const { headers, rows } = props
  const columns = headers ? headers.length : 0
  const showSpinner = rows === null

  function buildRow(row, headers) {
    return (
         <tr key={row._id}>
         {headers.map((value, index) => {
            if (value === 'Editar') {
              return <td key={index}>
                <Link to={`/edit/property/${row._id}`} className="btn btn-primary text-right" style={{color: 'white'}}>
                  <i className="material-icons">mode_edit</i>
                </Link>
              </td>
            } else if (value === 'Ver certificado') {
              return <td key={index}>
                <Link to={`/certificado/${row._id}`} className="btn btn-primary text-right" style={{color: 'white'}}>
                  <i className="material-icons">perm_media</i>
                </Link>
              </td>
            }
            else {
              return <td key={index}>{row[value]}</td>
            }
          })
         }
         </tr>
     )
  }

  return(
    <tbody>
        {showSpinner &&
          <tr key="spinner-0">
              <td colSpan={columns} className="text-center">
                  <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                  </div>
              </td>
          </tr>
        }
        { !showSpinner && rows && rows.map((value) => {
            return buildRow(value, headers)
        })}
    </tbody>
  )
}

export default Table