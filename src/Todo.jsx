import React, { useEffect, useState } from "react";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import './index.css';

function Todo() {

  const [todos, settodos] = useState([]);
  const [newtodos, setnewtodos] = useState('');
  const [editIndex, seteditIndex] = useState(null);
  const [edittodo, setedittodo] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('todos'));
    if (stored) {
      settodos(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addlist = () => {
    if (newtodos.trim()) {
      settodos([...todos, newtodos.trim()]);
      setnewtodos('');
    }
   
  }

  const handlesave = () => {
    const update = todos.map((todo, index) => (
      index === editIndex ? edittodo : todo
    ));
    settodos(update);
    setedittodo('');
    seteditIndex(null);
  }

  const handledelete = (index) => {
    settodos(todos.filter((_, i) => i !== index));
  }

  return (
    <div className="todo-container">
      <div className="inputlist">
        <input
          type="text"
          value={newtodos}
          placeholder="Enter your list"
          onChange={(e) => setnewtodos(e.target.value)}
        />
        <button onClick={addlist} className="add-button">Add List</button>
      </div>

      <div className="todo-list">
        <ul>
          {todos.map((todo, index) => (
            <li key={index} className="todo-item">
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={edittodo}
                    onChange={(e) => setedittodo(e.target.value)}
                    className="edit-input"
                  />
                  <button onClick={handlesave} className="icon-button"><SaveIcon /></button>
                </>
              ) : (
                <>
                  <span>{todo}</span>
                  <button
                    onClick={() => {
                      seteditIndex(index);
                      setedittodo(todo);
                    }}
                    className="icon-button"
                  >
                    <EditNoteIcon />
                  </button>
                  <button
                    onClick={() => handledelete(index)}
                    className="icon-button"
                  >
                    <DeleteIcon />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;

