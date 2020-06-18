import React, { useState, useEffect } from 'react'
import Map from '../components/Map'
import axios from 'axios'
import Web3 from 'web3'
import Houses from '../abisProduction/Houses.json'
// import Houses from '../abis/Houses.json'
import swal from 'sweetalert'
import '../styles/New.css'
const GmpsApiKey = process.env.REACT_APP_GMAPS_API_KEY
const ApiUrl = process.env.REACT_APP_APIURL

export default function NewProperty(props) {

    const [ownerName, setOwnerName] = useState('')
    const [ownerWallet, setOwnerWallet] = useState('')
    const [ownerCurp, setOwnerCurp] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [deedNumber, setDeedNumber] = useState('')
    const [notaria, setNotaria] = useState('')
    const [walletNotario, setWalletNotario] = useState('')
    const [numSolicitud, setNumSolicitud] = useState('')
    const [ubicacion, setUbicacion] = useState('')
    const [calle, setCalle] = useState('')
    const [numExterior, setNumExterior] = useState('')
    const [numInterior, setNumInterior] = useState('')
    const [colonia, setColonia] = useState('')
    const [estado, setEstado] = useState('')
    const [municipio, setMunicipio] = useState('')
    const [codigoPosal, setCodigoPosal] = useState('')
    const [account, setAccount] = useState('')
    const [ethBalance, setEthBalance] = useState('')
    const [houses, setHouses] = useState('')
    const [statehash, setHash] = useState('')
    const [counter, setCounter] = useState('')

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
            if(account) {
                const ethBalance = await web3.eth.getBalance(account)
                console.log('%c Cuenta y Balance ', 'color: #035fb9; background-color: #b0f566' , account, ethBalance)
                setEthBalance(ethBalance)
                //Load HOUSES Contract
                const networkId = await web3.eth.net.getId()
                const housesData = Houses.networks[networkId]
                if(housesData) {
                  const houses = new web3.eth.Contract(Houses.abi, housesData.address)
                  setHouses(houses)
                  console.log(houses)
                } else {
                    window.alert('EthSwap contract not deployed to detected network.')
                }
            }
        }
        loadWeb3()
        loadBlockchainData()
    }, [account])

    useEffect(() => {
        const getAllHouses = () => {
            if (houses) {
                houses.methods
                .getAll()
                .call()
                .then((allHouses) => {
                    console.log('%c Arreglo con todas las casas', 'color: #4af2a1', allHouses)
                    setCounter(allHouses.length)
                    return allHouses
                })
            }
        }
        getAllHouses()
    }, [houses])

    const createHouse = async(data) => {
        let {
            ownerName,
            ownerWallet,
            ownerCurp,
            birthdate,
            deedNumber,
            notaria,
            walletNotario,
            numSolicitud,
            ubicacion
        } = data

        let locationData = [calle, numExterior, numInterior, colonia, estado, municipio, codigoPosal]
        swal({
        title: "Se está a punto de registrar un nuevo Inmueble",
        text: `
            Los datos a registar son:
            Nombre de propietario: ${ownerName}
            Dirección de Inmueble ${ubicacion}
            Wallet en ETH bloclkchain de Propietario ${ownerWallet}
        `,
        icon: "info",
        buttons: true,
        })
        .then((acceptHouse) => {
        if (acceptHouse) {
            houses.methods
            .createHouse(
                ownerName,
                ownerWallet,
                ownerCurp,
                birthdate,
                deedNumber,
                notaria,
                walletNotario,
                numSolicitud,
                ubicacion,
                locationData
            )
            .send({ from: account })
            .on('transactionHash', (hash) => {
                swal({
                    title: "Registro de Inmueble exitoso",
                    text: `El hash de transacción a la Blockchain es ${hash}`,
                    icon: "success",
                    button: "Gracias 😅",
                })
                .then(() => {
                    setHash(hash)
                })
                .then(() => {
                    regNewProperty(data, hash)
                })
            })
        } else {
            swal({
            title: "No se registro ningún Inmueble",
            icon: "warning",
            });
        }
        });
    }

    const regNewProperty = async(data, hash) => {
        const allData = {
            ...data,
            hash: hash ? hash : '',
            idBc: counter
        }
        let res = await axios.post(`${ApiUrl}/properties/register`, allData)
        if(res.data.success){
            props.history.push('/dashboard')
        }else{
            console.error(res)
        }
    }

    /**
     Version CON Blockchain
    */
    const onSubmit = e => {
        e.preventDefault()
        const logUser = {
            "ownerName": ownerName,
            "ownerWallet": ownerWallet,
            "ownerCurp": ownerCurp,
            "birthdate": birthdate,
            "deedNumber": deedNumber,
            "notaria": notaria,
            "walletNotario": walletNotario,
            "numSolicitud": numSolicitud,
            "ubicacion": ubicacion,
            "calle": calle,
            "numExterior": numExterior,
            "numInterior": numInterior,
            "colonia": colonia,
            "estado": estado,
            "municipio": municipio,
            "codigoPosal": codigoPosal
        }
        createHouse(logUser)
    }

    const handleLocationValues = (data) => {
        const {address, street, exterior, neighborhood, state, municipio, cp} = data
        setUbicacion(address)
        setCalle(street)
        setNumExterior(exterior)
        setColonia(neighborhood)
        setEstado(state)
        setMunicipio(municipio)
        setCodigoPosal(cp)
    }

    /**
     Version Sin Blockchain
    */
    // const onSubmit = e => {
    //     e.preventDefault()
    //     const logUser = {
    //         "ownerName": ownerName,
    //         "ownerWallet": ownerWallet,
    //         "ownerCurp": ownerCurp,
    //         "birthdate": birthdate,
    //         "deedNumber": deedNumber,
    //         "notaria": notaria,
    //         "walletNotario": walletNotario,
    //         "numSolicitud": numSolicitud,
    //         "ubicacion": ubicacion,
    //         "calle": calle,
    //         "numExterior": numExterior,
    //         "numInterior": numInterior,
    //         "colonia": colonia,
    //         "estado": estado,
    //         "municipio": municipio,
    //         "codigoPosal": codigoPosal
    //     }
    //     regNewProperty(logUser)
    // }

    return (
        <div className="container">
          <div className="row title_register">
            <h3>Registro de Nuevo Inmueble</h3>
            <hr className="divider__Style"/>
          </div>
          <div className="row form__container">
            <form onSubmit={onSubmit}>
                <div className="row ownerData__container">
                    <div className="col-sm-12 col-md-6">
                        <input 
                        type="text" 
                        className="form-control form-control-lg ownerData-input" 
                        id="owner-name" 
                        aria-describedby="emailHelp" 
                        placeholder="Nombre del Propietario"
                        value={ownerName}
                        onChange={e => setOwnerName(e.target.value)}
                        />
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <input 
                        type="text" 
                        className="form-control form-control-lg ownerData-input" 
                        id="owner-wallet" 
                        placeholder="Wallet del Propietario"
                        value={ownerWallet}
                        onChange={e => setOwnerWallet(e.target.value)}
                        />
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <input 
                        type="text" 
                        className="form-control form-control-lg ownerData-input" 
                        id="owner-name" 
                        aria-describedby="emailHelp" 
                        placeholder="CURP del Propietario"
                        value={ownerCurp}
                        onChange={e => setOwnerCurp(e.target.value)}
                        />
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <input 
                        type="date" 
                        className="form-control form-control-lg ownerData-input" 
                        id="owner-wallet" 
                        placeholder="Fecha de Nacimiento del Propietario"
                        value={birthdate}
                        onChange={e => setBirthdate(e.target.value)}
                        />
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <input 
                        type="text" 
                        className="form-control form-control-lg ownerData-input" 
                        id="owner-name" 
                        aria-describedby="emailHelp" 
                        placeholder="Número de Escitura"
                        value={deedNumber}
                        onChange={e => setDeedNumber(e.target.value)}
                        />
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <input 
                        type="text" 
                        className="form-control form-control-lg ownerData-input" 
                        id="owner-name" 
                        aria-describedby="emailHelp" 
                        placeholder="Notaría"
                        value={notaria}
                        onChange={e => setNotaria(e.target.value)}
                        />
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <input 
                        type="text" 
                        className="form-control form-control-lg ownerData-input" 
                        id="owner-name" 
                        aria-describedby="emailHelp" 
                        placeholder="Wallet de Notario"
                        value={walletNotario}
                        onChange={e => setWalletNotario(e.target.value)}
                        />
                    </div>
                    <div className="col-sm-12">
                        <input 
                        type="text" 
                        className="form-control form-control-lg ownerData-input__large" 
                        id="owner-wallet" 
                        placeholder="No. de solicitu de trámite"
                        value={numSolicitud}
                        onChange={e => setNumSolicitud(e.target.value)}
                        />
                    </div>
                    <div className="col-sm-12">
                        <input 
                        type="text" 
                        className="form-control form-control-lg ownerData-input__large" 
                        id="owner-wallet" 
                        placeholder="Ubicación"
                        value={ubicacion}
                        onChange={e => setUbicacion(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                    <Map
                        google={props.google}
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&&libraries=geometry,drawing,places&key=${GmpsApiKey}`}
                        containerElement={<div style={{height: '400px'}} />}
                        mapElement={<div style={{height: '100%'}} />}
                        loadingElement={<p>Cargando</p>}
                        getUbicacion={handleLocationValues}
                    />
                    </div>
                    <div className="col-sm-6">
                        <div className="row">
                            <div className="col-sm-12">
                                <input 
                                type="text" 
                                className="form-control form-control-lg ownerData-input" 
                                id="owner-wallet" 
                                placeholder="Calle"
                                value={calle}
                                onChange={e => setCalle(e.target.value)}
                                />
                            </div>
                            <div className="col-sm-6">
                                <input 
                                type="text" 
                                className="form-control form-control-lg ownerData-input" 
                                id="owner-wallet" 
                                placeholder="Num Exterior"
                                value={numExterior}
                                onChange={e => setNumExterior(e.target.value)}
                                />
                            </div>
                            <div className="col-sm-6">
                                <input 
                                type="text" 
                                className="form-control form-control-lg ownerData-input" 
                                id="owner-wallet" 
                                placeholder="Num Interior"
                                value={numInterior}
                                onChange={e => setNumInterior(e.target.value)}
                                />
                            </div>
                            <div className="col-sm-12">
                                <input 
                                type="text" 
                                className="form-control form-control-lg ownerData-input" 
                                id="owner-wallet" 
                                placeholder="Colonia"
                                value={colonia}
                                onChange={e => setColonia(e.target.value)}
                                />
                            </div>
                            <div className="col-sm-12">
                                <input 
                                type="text" 
                                className="form-control form-control-lg ownerData-input" 
                                id="owner-wallet" 
                                placeholder="Estado"
                                value={estado}
                                onChange={e => setEstado(e.target.value)}
                                />
                            </div>
                            <div className="col-sm-6">
                                <input 
                                type="text" 
                                className="form-control form-control-lg ownerData-input" 
                                id="owner-wallet" 
                                placeholder="Municipio"
                                value={municipio}
                                onChange={e => setMunicipio(e.target.value)}
                                />
                            </div>
                            <div className="col-sm-6">
                                <input 
                                type="text" 
                                className="form-control form-control-lg ownerData-input" 
                                id="owner-wallet" 
                                placeholder="C.P."
                                value={codigoPosal}
                                onChange={e => setCodigoPosal(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 text-right mt-3">
                        <button type="submit" className="btn btn-primary text-right">Registrar Inmueble</button>
                    </div>
                </div>
            </form>
          </div>
        </div>
    )
}
