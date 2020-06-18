import React from 'react'
import '../styles/Certificado.css'
const QRCode = require('qrcode.react');

export default function QrTransaction(props) {
  return(
    <div className="qrTransContainer">
      <a target="_blank" rel="noopener noreferrer" href={`https://ropsten.etherscan.io/tx/${props.hash}`}>{ props.hash }</a>
      <QRCode value={`https://ropsten.etherscan.io/tx/${props.hash}`} />
    </div>
  )
}