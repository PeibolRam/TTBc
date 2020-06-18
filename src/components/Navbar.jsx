import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Web3 from 'web3'
import { deleteToken } from '../utils/Auth'
import Identicon from 'identicon.js';

import '../styles/Navbar.css'

export default function Navbar() {
    const isAuthenticated = localStorage.getItem("TT_TOKEN") !== null;
    const [account, setAccount] = useState('')
    const [ethBalance, setEthBalance] = useState('')
    useEffect(() => {
        const loadWeb3 = async() => {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum)
                await window.ethereum.enable()
            }
            else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider)
            }
            else {
                window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
            }
        }

        const loadBlockchainData = async() => {
            const web3 = window.web3
            const accounts = await web3.eth.getAccounts()
            setAccount(accounts[0])
        }
            // const getOwnerHouseById = (id) => {
    //     houses.methods
    //     .houseToOwner(id)
    //     .call()
    //     .then((addressFromOwner) => {
    //         console.log('Wallet del Usuario', addressFromOwner)
    //         return addressFromOwner
    //     })
    // }
    // const getHouseDataById = (id) => {
    //     houses.methods
    //     .houses(id)
    //     .call()
    //     .then((houseData) => {
    //         console.log('Obj con Data de la Casa', houseData)
    //         return houseData
    //     })
    // }
    // const getAllHouses = () => {
    //     if (houses) {
    //         houses.methods
    //         .getAll()
    //         .call()
    //         .then((allHouses) => {
    //             console.log('Arreglo con todas las casas', allHouses)
    //             return allHouses
    //         })
    //     }
    // }
        loadWeb3()
        loadBlockchainData()
    }, [account])

    return (
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-3 mb-5 shadow">
            {
                isAuthenticated ?
                <ul>
                    <li>
                        <Link to="/dashboard">
                            <span className="navbar-brand col-sm-3 col-md-2 mr-0">
                                Registro de inmueble en Blockchain
                            </span>
                        </Link>
                    </li>
                    <li>
                        <small className="text-secondary">
                            <small id="account">{account ? account : '0xCc386B6f1ca0cffAe3819cEb74622d8308f7258c'}</small>
                        </small>
                        { account
                        ?
                        <Link to="/login" onClick={()=>{
                            deleteToken()
                        }}>
                            <img
                                className="ml-2"
                                width='30'
                                height='30'
                                src={`data:image/png;base64,${new Identicon(account, 30).toString()}`}
                                alt=""
                            />
                        </Link>
                        : <img
                              className="ml-2"
                              width='30'
                              height='30'
                              src={`data:image/png;base64,${new Identicon('0xCc386B6f1ca0cffAe3819cEb74622d8308f7258c', 30).toString()}`}
                              alt=""
                          />
                        }
                    </li>
                    {/* <li>
                        <Link to="/login" onClick={()=>{
                            deleteToken()
                        }}>Logout</Link>
                    </li> */}
                </ul>
                :
                <ul>
                    <li>
                        <Link to="/">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul> 
               
            }
        </nav> 
    )
}