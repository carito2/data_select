import React from "react";
//Import CSS
import '../components/selection.css'

function Selection({ tableSelect, setTableSelect }) {
    const deleteListSelect = (e) => {
        e.preventDefault();
        setTableSelect([]);
    }
    return(
        <section className='selection'>
            <p>Selección</p>
            <article className='boxSelection'>
                {
                    tableSelect.map((table) => { 
                        return(
                            <li key={table} className='tableSelect flex' >{table}</li>
                        )
                    })
                }
            </article>
            <button className='button clickMe' onClick={deleteListSelect}>Borrar</button>
        </section>
    )
}

export default Selection;