import React, { useState, useEffect } from 'react';
import './todolist.css'


function Todolist() {
  // Stato per memorizzare gli elementi della lista
  const [listAdd, setListAdd] = useState([]);

  // Stato per memorizzare il valore dell'input
  const [inputValue, setInputValue] = useState('');

  // Effetto per caricare gli elementi dalla Local Storage al montaggio del componente
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('todoList')) || [];
    setListAdd(storedList);
  }, []);

  // Effetto per salvare gli elementi nella Local Storage ad ogni aggiornamento della lista
  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(listAdd));
  }, [listAdd]);

  // Funzione per aggiungere un elemento alla lista
  const addList = () => {
    if (inputValue.trim() !== '') {
      setListAdd([...listAdd, inputValue]);
      setInputValue('');
    }
  };

  // Funzione per rimuovere un elemento dalla lista
  const removeList = (index) => {
    const updatedList = [...listAdd];
    updatedList.splice(index, 1);
    setListAdd(updatedList);
  };
  return (
    <div className='container'>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addList}>Aggiungi</button>
      </div>
      <ul>
        {listAdd.map((item, index) => (
          <li key={index}>
            {item}{' '}
            <button className="remove-list" onClick={() => removeList(index)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todolist;