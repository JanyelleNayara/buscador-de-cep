import React, { useState } from 'react';
import {FiSearch} from 'react-icons/fi'
import { api } from './services/api';
import './globals.css'

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch(){

    if (input === ''){
      return alert('digite um cep válido')
    }
    
    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')

    } catch{
      alert('Erro ao buscar o cep"')
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className='title'>Buscador CEP</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu Cep..."
          value={input}  
          onChange={(event) => setInput(event.target.value)}
        />
          
      <button className="buttonSearch" onClick={handleSearch} >
        <FiSearch />
        </button>
      </div>

      {Object.keys(cep).length > 1 && (
        <main className='address'>
          <h2>CEP: {cep.cep} </h2>

          <span>{cep.logradouro} </span>
          <span>Complemento: {cep.complemento} </span>
          <span>{cep.bairro} </span>
          <span>{cep.localidade}  - {cep.uf} </span>
        </main>
      )}


    </div>
  );
}

export default App;
