import React from 'react'

import HeroImg from '../images/hero.png'
import Desc from '../images/desc.png'
import Obj from '../images/obj.png'

import '../styles/Home.css'

export default function Home() {
    return (
        <>
            <div className="hero" style={{ backgroundImage: `url(${HeroImg})` }}>
                <div className="shadow_back">
                    <h1>Aplicación descentralizada para validación de propiedad de inmuebles en Blockchain.</h1>
                </div>
            </div>
            <section className="description_app">
                <img src={Obj} alt=""/>
                <div className="description_app_t">
                    <h2>Propuesta</h2>
                    <p>Desarrollo de un sistema descentralizado que sirva como herramienta adicional al registro público de la propiedad.</p>
                </div>
            </section>
            <section className="description_app">
                <div className="description_app_t">
                    <p>Se pretende disminuir el número de fraudes de compra/venta de inmuebles, así como una forma de registro de propiedad más segura, transparente y confiable.</p>
                </div>
                <img src={Desc} alt=""/>
            </section>
        </>
    )
}
