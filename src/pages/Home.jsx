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
                    <h2>Objetivo</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, facere. Alias, assumenda odit quia quae id vero? Quisquam totam numquam recusandae eaque sed excepturi ab, at facere minima, quam iure.</p>
                </div>
            </section>
            <section className="description_app">
                <div className="description_app_t">
                    <h2>Justificación</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, facere. Alias, assumenda odit quia quae id vero? Quisquam totam numquam recusandae eaque sed excepturi ab, at facere minima, quam iure.</p>
                </div>
                <img src={Desc} alt=""/>
            </section>
        </>
    )
}
