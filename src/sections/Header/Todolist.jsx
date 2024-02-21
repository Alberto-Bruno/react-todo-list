import React, { useState, useEffect } from 'react';
import './todolist.css'


function Todolist() {
  //Stato per memorizzare gli elementi della lista
  const [listAdd, setListAdd] = useState([]);
  //Stato per memorizzare il valore dell'input
  const [inputValue, setInputValue] = useState('');


  //Effetto per caricare gli elementi dalla Local Storage al montaggio del componente
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('todoList')) || [];
    setListAdd(storedList);
  }, []);
  //Effetto per salvare gli elementi nella Local Storage ad ogni aggiornamento della lista
  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(listAdd));
  }, [listAdd]);


  //Funzione per aggiungere un elemento alla lista
  const addList = () => {
    if (inputValue.trim() !== '') {
      setListAdd([...listAdd, inputValue]);
      setInputValue('');
    }
  };
  //Funzione per rimuovere un elemento dalla lista
  const removeList = (index) => {
    const updatedList = [...listAdd];
    updatedList.splice(index, 1);
    setListAdd(updatedList);
  };
   // Funzione per eliminare tutta la lista
  const removeAll = () => {
    setListAdd([]);
  };



  //Funzione per tasto premuto "Enter" per aggiungere un elemento alla lista"
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addList();
    }
  };


  return (
    <div className='container'>
      <h1 className='mt-4 text-center'>Todo List</h1>
      <div className='input-group mb-3'>
        <input className='form-control'
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className='btn btn-outline-primary' type='button' onClick={addList}>Aggiungi</button>
      </div>
      <div className='mb-3'>
        <button className='btn btn-outline-danger' type='button' onClick={removeAll}>
          Elimina
        </button>
      </div>
      <ul className='list-group'>
        {listAdd.map((item, index) => (
          <li className='list-group-item d-flex justify-content-between align-items-center' key={index}>
            {item}{' '}
            <button className="btn btn-danger" onClick={() => removeList(index)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todolist;