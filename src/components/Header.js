import React from "react";
//Imports icons or images
import logo from '../images/logo.png';
//Import CSS
import '../components/header.css';
function Header () {
    return (
        <header className='header flex'>
            <h1>Selección de DATA</h1>
            <div className='logoBox flex'>
                <img
                    src={logo}
                    className='logo'
                    alt='Logotipo OpenCore'
                />
            </div>
        </header>
    )
}

export default Header;