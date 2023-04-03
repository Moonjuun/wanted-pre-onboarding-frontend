import React, { useState, useEffect } from "react";
import axios from "axios";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const getTodos = async () => {
    try {
      const access_token = localStorage.getItem("jwt");
      await axios
        .get("https://www.pre-onboarding-selection-task.shop/todos", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((result) => setTodos(result.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const createTodo = async (newTodo) => {
    try {
      const access_token = localStorage.getItem("jwt");
      const response = await axios
        .post(
          "https://www.pre-onboarding-selection-task.shop/todos",
          {
            todo: newTodo,
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((result) => {
          if (result.status === 201) {
            setTodos([...todos, result.data]); // 상태 업데이트
            setNewTodo("");
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  const handleNewTodoChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodoClick = async (e) => {
    e.preventDefault();
    const isTodoValid = newTodo.trim().length > 0;
    if (isTodoValid) {
      createTodo(newTodo);
    }
  };

  const deleteTodo = (id) => {
    const access_token = localStorage.getItem("jwt");
    const response = axios
      .delete(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((result) => {
        if (result.status === 204) {
          getTodos();
          console.log("삭제완료");
        }
      });
  };

  return (
    <div>
      <h1>이 곳은 TODO 화면입니다</h1>
      <div>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input type="checkbox" defaultChecked={todo.isCompleted} />
              <span>{todo.todo}</span>
            </label>
            <button data-testid="modify-button">수정</button>
            <button
              data-testid="delete-button"
              onClick={() => deleteTodo(todo.id)}
            >
              삭제
            </button>
          </li>
        ))}
      </div>
      <div>
        <input
          data-testid="new-todo-input"
          value={newTodo}
          onChange={handleNewTodoChange}
        />
        <button data-testid="new-todo-add-button" onClick={handleAddTodoClick}>
          추가
        </button>
      </div>
    </div>
  );
};

export default Todo;
