import React, { useState, useEffect } from 'react'
import QrTransaction from '../components/qrtransaction'
import Cert from '../images/logo.png'
import BgCert from '../images/cert-op.png'
import axios from 'axios'
import '../styles/Certificado.css'
const ApiUrl = process.env.REACT_APP_APIURL

export default function Certifiado(props) {
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
    const [idBc, setBC] = useState('')
    const [account, setAccount] = useState('')
    const [ethBalance, setEthBalance] = useState('')
    const [houses, setHouses] = useState('')
    const [statehash, setHash] = useState('')
    const [counter, setCounter] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getProperty(props.id)
        return () => {
            console.log('remove from EditProperty')
        }
    }, [])
    
    const getProperty = async(id) => {
        let res = await axios.get(`${ApiUrl}/properties/${id}`)
        console.log('%c Data', 'color: #b0f566', res.data)
        if (res && res.data) {
            if(res.data.ownerName){
                setOwnerName(res.data.ownerName)
            }
            if(res.data.ownerWallet){
                setOwnerWallet(res.data.ownerWallet)
            }
            if(res.data.ownerCurp){
                setOwnerCurp(res.data.ownerCurp)
            }
            if(res.data.birthdate){
                setBirthdate(res.data.birthdate.substr(0,10))
            }
            if(res.data.deedNumber){
                setDeedNumber(res.data.deedNumber)
            }
            if(res.data.notaria){
                setNotaria(res.data.notaria)
            }
            if(res.data.walletNotario){
                setWalletNotario(res.data.walletNotario)
            }
            if(res.data.numSolicitud){
                setNumSolicitud(res.data.numSolicitud)
            }
            if(res.data.ubicacion){
                setUbicacion(res.data.ubicacion)
            }
            if(res.data.calle){
                setCalle(res.data.calle)
            }
            if(res.data.numExterior){
                setNumExterior(res.data.numExterior)
            }
            if(res.data.numInterior){
                setNumInterior(res.data.numInterior)
            }
            if(res.data.colonia){
                setColonia(res.data.colonia)
            }
            if(res.data.estado){
                setEstado(res.data.estado)
            }
            if(res.data.municipio){
                setMunicipio(res.data.municipio)
            }
            if(res.data.codigoPosal){
                setCodigoPosal(res.data.codigoPosal)
            }
            if(res.data.idBc){
                setBC(res.data.idBc)
            }
            if(res.data.hash) {
                if (statehash && statehash.includes(res.data.hash)) {
                } else {
                    setHash(res.data.hash)
                }
            }
        }
        setLoading(false)
    }

    return (
        <div className="container">
            <div className="container-cert">
                <div className="border">
                    <div className="header-cert">
                        <h1>Certificado de propiedad de un inmueble</h1>
                        <img src={Cert} alt="logo"/>
                    </div>
                    <div className="info">
                        <h2>Propietario: </h2>
                        <h3><span className="hunderline">{ownerName}</span></h3>
                    </div>
                    <div className="info">
                        <h2>Wallet del Propietario: </h2>
                        <h3><span className="hunderline">{ownerWallet}</span></h3>
                    </div>
                    <div className="info">
                        <h2>Dirección:</h2>
                        <h3><span className="hunderline">{ubicacion}</span></h3>
                    </div>
                    <br/>
                    <div className="info">
                        <h3>El inmueble ha tenido {statehash.length} transaccion(es)</h3>
                        {
                            statehash && statehash.length > 0 ? statehash.map((hash) => {
                                return <QrTransaction hash={hash} key={hash}/>
                            }) : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
