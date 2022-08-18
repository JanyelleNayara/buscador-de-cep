import React, { useState } from 'react';
import {FiSearch} from 'react-icons/fi'
import { api } from './services/api';
import { IMaskInput } from 'react-imask';
import './globals.css'

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch(event){
    event.preventDefault()


    if (input === ''){
      return alert('digite um cep válido')
    }
    
    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')

    } catch{
      setCep('')
      alert('Erro ao buscar o cep"')
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className='title'>Buscador CEP</h1>
      <form onSubmit={handleSearch} >
      <div className="containerInput">
        <IMaskInput
          mask="00000-000"
          type="text"
          placeholder="Digite seu Cep..."
          value={input}  
          onChange={(event) => setInput(event.target.value)}
        />
          
      <button className="buttonSearch" type='submit' >
        <FiSearch />
        </button>
      </div>
      </form>
      {Object.keys(cep).length > 1 && (
        <main className='address'>
          <h2>CEP: {cep.cep} </h2>
          {cep.logradouro && <span>Logradouro: {cep.logradouro} </span>}
          {cep.complemento && <span>Complemento: {cep.complemento} </span>}
          {cep.bairro && <span> Bairro: {cep.bairro} </span>}
          {cep.localidade && <span>Cidade: {cep.localidade}  - {cep.uf} </span>}
        </main>
      )}


    </div>
  );
}

export default App;
