import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./config";


function App() {
  const [inputVal, setInputVal] = useState("");
  const [todos, setTodos] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempId, setTempId] = useState('');


  const getTodos = () => {
    axios.get(`${BASE_URL}/todo`)
      .then((response) => {
        console.log("response", response);
        setTodos([...response.data.data]);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const createTodo = (e) => {
    e.preventDefault()

    const objToSend = {
      todo: inputVal,
    };

    axios.post(`${BASE_URL}/todo`, objToSend)
      .then((response) => {
        console.log("response", response);

        if(response.data.status) {
          setRefresh(!refresh);
          setInputVal("");
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
    
  const editTodo = (id, todo) => {
    // console.log("id", id);
    
    setIsEditing(true);
    setInputVal(todo);
    setTempId(id);
  }
  
  const updateTodo = (e) => {
    e.preventDefault();
    
    const objToSend = {
      id: tempId,
      todo: inputVal,
    }
    
    axios.put(`${BASE_URL}/todo`, objToSend)
    .then((response) => {
      console.log("response", response);
      
      if(response.data.status) {
        setRefresh(!refresh);
        setIsEditing(false);
        setInputVal("");
        setTempId("");
      } else {
        alert(response.data.message);
      }
    })
    .catch((error) => {
      console.log("error", error);
    })
  }
    
  const deleteTodo = (id) => {
    // console.log("id", id);

    axios.delete(`${BASE_URL}/todo/${id}`)
    .then((response) => {
      console.log("response", response);
      setRefresh(!refresh);
    })
    .catch((error) => {
      // console.log("error", error);
      alert(error);
    });
  }

  const deleteAll = () => {
    axios.delete(`${BASE_URL}/alltodos`)
    .then((response) => {
      console.log("response", response);
      setRefresh(!refresh);
    })
    .catch((error) => {
      console.log("error", error);
      // alert(error);
    });
  }


  useEffect(() => {
    getTodos();
  }, [refresh]);
  

  return (
    <>
      <form onSubmit={isEditing ? updateTodo : createTodo}>
        <input
          type="text"
          placeholder="Enter To do"
          onChange={(e) => setInputVal(e.target.value)}
          value={inputVal}
        />
        <button type="submit">{isEditing ? `Save` : `Add`}</button>
        <button type="button" onClick={deleteAll}>Delete All</button>
      </form>

      <ul>
        {todos && todos.length > 0
          ? todos.map(({_id, todo}) => {
              return (
                <li key={_id}>
                  {todo}
                  <button onClick={() => editTodo(_id, todo)}>Edit</button>
                  <button onClick={() => deleteTodo(_id)}>Delete</button>
                </li>
              );
            })
          : null}
      </ul>
    </>
  );
}


export default App;