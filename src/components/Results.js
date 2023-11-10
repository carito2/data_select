import React, { useState } from "react";
import { v4 as uid4 } from 'uuid';
//Import CSS
import '../components/results.css'

function Results({ tableSelect, setTableSelect }) {
    const [inputValue, setInputValue] = useState('');
    const [inputNameService, setInputNameService] = useState('');
    const [request, setRequest] = useState({});
    const [result, setResult] = useState({});
    const [requestResult, setRequestResult] = useState({});
    const [errorMessage, setErrorMessage] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState(false);
    let newRequest = {};

    const handleInputText = (e) => {
        console.log(e.target.value);
        let description = e.target.value;
        newRequest = {
            "description": description,
            "selectedLists": tableSelect,
            "id": uid4()
        }
        setInputValue(e.target.value);
        setRequest(newRequest);
        console.log(newRequest);
    }

    const handleButton = (e) => {
        e.preventDefault();
        console.log(request);
        console.log(Object.keys(request).length > 0);
        if(Object.keys(request).length > 0) {
            fetch('https://data-select-server.onrender.com/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setRequestResult(data);
            })
        }
    }

    const handleClickDelete = (e) => {
        e.preventDefault();
        newRequest = {};
        setRequestResult({});
        setInputValue('');
        setRequest({});
        setResult({});
        setInputNameService('');
        setTableSelect([]);
    };

    const handleInputNameOfService = (e) => {
        let nameService = e.target.value;
        const newResult = {
            "name": nameService,
            "id": request.id
        }
        setInputNameService(e.target.value);
        setResult(newResult);
    };

    const handleClickOk = (e) => {
        e.preventDefault();
        console.log(result);
        console.log(Object.keys(result).length > 0);
        if(Object.keys(result).length > 0) {
            fetch('https://data-select-server.onrender.com/result', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(result)
            })
            newRequest = {};
            setRequestResult({});
            setInputValue('');
            setRequest({});
            setResult({});
            setInputNameService('');
            setTableSelect([]);
            setErrorMessage(false);
            setConfirmationMessage(true);
        } else {
            setErrorMessage(true);
        }
    }

    const handleButtonConfirmation = () => {
        setConfirmationMessage(false);
    }

    return(
        <section className='results flex'>
            <article className='insertText boxResult'>
                <p>Ingresar Texto</p>
                <aside className='box flex'>
                    <textarea type='text' className='inputText' onChange={handleInputText} value={inputValue} />
                    <div className='boxButton flex'>
                        <button className='button' onClick={handleButton}>Procesar</button>
                        <button className='button' onClick={handleClickDelete}>Borrar</button>
                    </div>
                </aside>
            </article>
            <article className='result boxResult'>
                <p>Resultado</p>
                <aside className='box flex'>
                    <div className='result'>
                        {
                            Object.keys(requestResult).length > 0 
                                && <p>La solicitud con id: <p className='id'>{requestResult.id}</p> se ha generado con éxito.</p>
                        }
                    </div>
                    <div className='boxButton flex'>
                        <button className='button' onClick={handleClickOk}>Ok</button>
                        <button className='button' onClick={handleClickDelete}>Borrar</button>
                    </div>
                </aside>
                {errorMessage && <p className='errorMessage1'>Falta ingresar nombre de servicio.</p>}
            </article>
            <article className='nameService'>
                <p>Nombre de Servicio</p>
                <aside className='box flex'>
                    <input type='text' className='resultNameOfService' onChange={handleInputNameOfService} value={inputNameService}/>
                    <div className='boxButton flex'></div>
                </aside>
            </article>
            {
                confirmationMessage &&
                    <article className='confirmationMessage'>
                        <p>Se ha enviado correctamete.</p>
                        <button className='button' onClick={handleButtonConfirmation}>Ok</button>
                    </article>
            }
        </section>
    )
}

export default Results;