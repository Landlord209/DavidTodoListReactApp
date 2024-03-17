import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };

  const handleEditTodo = (index, value) => {
    setEditIndex(index);
    setEditValue(value);
  };

  const handleSaveEdit = (index) => {
    const newTodos = [...todos];
    newTodos[index] = editValue;
    setTodos(newTodos);
    setEditIndex(null);
    setEditValue('');
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditValue('');
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    const promt = confirm("Sure to delete?")
    if(promt){
        newTodos.splice(index, 1);
        setTodos(newTodos);
        if (editIndex === index) {
        setEditIndex(null);
        setEditValue('');
        }
    }else{
        setTodos(todos)
    }
  
  };

  return (
    
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a new todo"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>


      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {index === editIndex ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(index)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                {todo}
                <button onClick={() => handleEditTodo(index, todo)}>Edit</button>
                <button onClick={() => handleDeleteTodo(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
            