import { useState } from 'react';
//Imports components
import Header from './components/Header';
import Tables from './components/Tables';
import Selection from './components/Selection';
import Results from './components/Results';
//Import CSS
import './App.css';

function App() {
  const [tableSelect, setTableSelect] = useState([]);
  return (
    <div className="App">
      <Header />
      <main className='mainData flex'>
        <Tables tableSelect={tableSelect} setTableSelect={setTableSelect}/>
        <Selection tableSelect={tableSelect} setTableSelect={setTableSelect} />
        <Results tableSelect={tableSelect} setTableSelect={setTableSelect}/>
      </main>
      
    </div>
  );
}

export default App;
