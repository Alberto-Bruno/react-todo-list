import React, { useState, useEffect } from 'react';
import { MdDeleteForever } from "react-icons/md";
import './todolist.css'


function Todolist() {
  //Stato per memorizzare gli elementi della lista
  const [listAdd, setListAdd] = useState([]);
  //Stato per memorizzare il valore dell'input
  const [inputValue, setInputValue] = useState('');
  //Stato per tenere traccia degli elementi selezionati della lista
  const [selectedItems, setSelectedItems] = useState([]);


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


  const toggleSelection = (index) => {
    const updatedSelectedItems = [...selectedItems];
    const isItemSelected = updatedSelectedItems.includes(index);

    if (isItemSelected) {
      const indexToRemove = updatedSelectedItems.indexOf(index);
      updatedSelectedItems.splice(indexToRemove, 1);
    } else {
      updatedSelectedItems.push(index);
    }

    setSelectedItems(updatedSelectedItems);
  };

  const deleteSelected = () => {
    const updatedList = listAdd.filter((_, index) => !selectedItems.includes(index));
    setListAdd(updatedList);
    setSelectedItems([]);
  };

  const toggleAll = () => {
    if (selectedItems.length === listAdd.length) {
      setSelectedItems([]);
    } else {
      const allIndexes = Array.from({ length: listAdd.length }, (_, i) => i);
      setSelectedItems(allIndexes);
    }
  };


  return (
    <div className='container my-5'>
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
          Elimina lista
        </button>
        <button className='btn btn-outline-danger mr-2' type='button' onClick={deleteSelected}>
          Elimina Selezionati
        </button>
        <button className='btn btn-outline-secondary' type='button' onClick={toggleAll}>
          {selectedItems.length === listAdd.length ? 'Deseleziona Tutto' : 'Seleziona Tutto'}
        </button>
      </div>
      <ul className='list-group'>
        {listAdd.map((item, index) => (
          <li className={`list-group-item d-flex justify-content-between align-items-center ${
              selectedItems.includes(index) ? 'list-group-item-info' : ''
            }`}
            onClick={() => toggleSelection(index)}>
            {item}{' '}
            <button className="btn btn-danger" onClick={() => removeList(index)}>
              <MdDeleteForever />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todolist;