import React from "react";
//Import CSS
import '../components/tables.css'

function Tables({ tableSelect, setTableSelect }) {
    const tableList = ['Tabla 1', 'Tabla 2', 'Tabla 3'];
    const handleSelect = (e) => {
        let nameTable = e.target.innerText;
        const foundName = tableSelect.find((name) => name === nameTable);
        if(foundName) {
            console.log('Existo');
        } else{
            setTableSelect([...tableSelect, nameTable]);
        }
    }
    return(
        <section className='tables'>
            <p>Tablas Base de Datos</p>
            <article className='boxTables'>
                {tableList.map((table) => {
                    return (
                        <li key={table} className='tableList flex clickMe' onClick={handleSelect}>{table}</li>
                    )
                })}
            </article>
        </section>
    )
}

export default Tables;