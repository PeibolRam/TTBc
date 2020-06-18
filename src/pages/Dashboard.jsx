import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Table from '../components/Table';
import schema from './schema.json';
import '../styles/New.css'
import '../styles/Dashboard.css'
const ApiUrl = process.env.REACT_APP_APIURL


export default function Dashboard() {

    const [ data, setData] = useState(null)

    useEffect(() => {
        const allHouses = async() => {
            axios.get(`${ApiUrl}/properties/`)
            .then(function (response) {
                setData(response.data)
            })
        }
        allHouses()
    }, [])

    return (
        <div className="dashboard-container">
            <div className="container">
            <div className="row title_register table_reg">
                <h2>Lista de inmuebles registrados</h2>
                    <Link to='/new/property' className="btn btn-primary text-right" style={{height: '50px', color: 'white', display: 'flex', alignItems: 'center' }}>Registrar inmueble</Link>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <Table headers={Object.keys(schema)} rows={data}/>
                </div>
            </div>
        </div>
        </div>
    )
}
