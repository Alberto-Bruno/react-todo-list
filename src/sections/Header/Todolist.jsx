import React, { useState, useEffect } from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import './todolist.css'


function Todolist() {
  //Stato per memorizzare gli elementi della lista
  const [listAdd, setListAdd] = useState([]);
  //Stato per memorizzare il valore dell'input
  const [inputValue, setInputValue] = useState('');
  //Stato per tenere traccia degli elementi selezionati della lista
  const [selectedItems, setSelectedItems] = useState([]);
  //Stato per tenere traccia dell'indice dell'elemento attualmente in fase di modifica
  const [editingIndex, setEditingIndex] = useState(null);

  //Effetto per caricare gli elementi dalla Local Storage al montaggio del componente
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('todoList')) || [];
    setListAdd(storedList);
  }, []);

  //Effetto per salvare gli elementi nella Local Storage ad ogni aggiornamento della lista
  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(listAdd));
  }, [listAdd]);

  //Funzione per aggiungere o modificare un elemento nella lista
  const addList = () => {
    if (inputValue.trim() !== '') {
      if (editingIndex !== null) {
        //Modifica dell'elemento
        const updatedList = [...listAdd];
        updatedList[editingIndex] = inputValue;
        setListAdd(updatedList);
        setEditingIndex(null);
      } else {
        //Aggiunta di un nuovo elemento
        setListAdd([...listAdd, inputValue]);
      }
      setInputValue('');
    }
  };

  //Funzione per rimuovere un elemento dalla lista
  const removeList = (index) => {
    const updatedList = [...listAdd];
    updatedList.splice(index, 1);
    setListAdd(updatedList);
    setEditingIndex(null);
  };

  //Funzione elimina tutta la lista
  const removeAll = () => {
    setListAdd([]);
    setEditingIndex(null);
  };

  //Funzione "Enter" per aggiungere o modificare un elemento nella lista
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addList();
    }
  };

  //Funzione per modificare di un elemento
  const editItem = (index) => {
    setInputValue(listAdd[index]);
    setEditingIndex(index);
  };

  //Funzione che gestisce il toggle di selezione/deselezione 
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

  //Funzione per eliminare gli elementi
  const deleteSelected = () => {
    const updatedList = listAdd.filter((_, index) => !selectedItems.includes(index));
    setListAdd(updatedList);
    setSelectedItems([]);
    setEditingIndex(null);
  };

  //Funzione seleziona/deseleziona tutti gli elementi
  const toggleAll = () => {
    if (selectedItems.length === listAdd.length) {
      setSelectedItems([]);
    } else {
      const allIndexes = Array.from({ length: listAdd.length }, (_, i) => i);
      setSelectedItems(allIndexes);
    }
  };

  return (
    <div className='container mt-5'>
      <h1 className='mb-4 text-center'>Todo List</h1>
      <div className='input-group mb-3'>
        <input
          className='form-control'
          type="text"
          placeholder='Scrivi la lista'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className='btn btn-outline-primary' type='button' onClick={addList}>Aggiungi</button>
        <button className='btn btn-outline-secondary dropdown-toggle' type='button' data-bs-toggle="dropdown" aria-expanded="false">Elimina/Modifica</button>
        <ul className='dropdown-menu dropdown-menu-end'>
          <li>
            <button className='dropdown-item' type='button' onClick={removeAll}>
              Elimina lista
            </button>
          </li>
          <li>
            <button className='dropdown-item' type='button' onClick={deleteSelected}>
              Elimina Selezionati
            </button>
          </li>
          <li>
            <button className='dropdown-item' type='button' onClick={toggleAll}>
              {selectedItems.length === listAdd.length ? 'Deseleziona Tutto' : 'Seleziona Tutto'}
            </button>
          </li>
        </ul>
      </div>
      <ul className='list-group'>
        {listAdd.map((item, index) => (
          <li className={`list-group-item d-flex justify-content-between align-items-center 
            ${selectedItems.includes(index) ? 'list-group-item-info' : ''}`}
            onClick={() => toggleSelection(index)}>
            {item}{' '}

            <div className='btn-group'>
              <button className="btn btn-danger btn-sm delete-btn" onClick={() => removeList(index)}>
                <MdDeleteForever />
              </button>
              <button className="btn btn-primary btn-sm edit-btn" onClick={() => editItem(index)}>
                <MdEdit />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todolist;