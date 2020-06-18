import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer>
            <h2>TT20-2-007</h2>
            <ul >
                <li>Hernández Castelán Héctor Iván</li>
                <li>Ramírez Vázquez Pablo Antonio</li>
            </ul>
            <Link to='/aviso'>Aviso de privacidad</Link>
        </footer>
    )
}