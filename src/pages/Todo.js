import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Todo = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState("");

  // 리다이렉트
  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      navigate("/signin", { replace: true });
    }
  }, [navigate]);

  // todo list
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

  // 추가
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
            console.log("추가완료");
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

  // 삭제
  const deleteTodo = (id) => {
    const access_token = localStorage.getItem("jwt");
    axios
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

  // 수정
  const updateTodo = async (id, text) => {
    try {
      const access_token = localStorage.getItem("jwt");
      await axios
        .put(
          `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
          {
            todo: text,
            isCompleted: false,
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((result) => {
          if (result.status === 200) {
            console.log("수정완료");
            setTodos((prevTodos) =>
              prevTodos.map((todo) => {
                if (todo.id === id) {
                  todo.todo = text;
                }
                return todo;
              })
            );
            setEditingTodoId(null);
            setEditingTodoText("");
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTodoChange = (e) => {
    setEditingTodoText(e.target.value);
  };

  const handleEditTodoSubmit = async (e) => {
    e.preventDefault();
    const isTodoValid = editingTodoText.trim().length > 0;
    if (isTodoValid) {
      updateTodo(editingTodoId, editingTodoText);
    }
  };

  const handleEditTodoCancel = () => {
    setEditingTodoId(null);
    setEditingTodoText("");
  };

  // 로그아웃
  function logout() {
    // 로컬스토리지에서 JWT 토큰을 삭제합니다.
    localStorage.removeItem("jwt");
    // "/" 로 이동합니다.
    navigate("/");
  }

  return (
    <div className="Todo">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>TODO List</h1>
        <Button
          text={"로그아웃"}
          type={"negative"}
          onClick={logout}
        ></Button>{" "}
      </div>
      <div>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingTodoId === todo.id ? (
              <form onSubmit={handleEditTodoSubmit}>
                <input
                  type="text"
                  data-testid="modify-input"
                  value={editingTodoText}
                  onChange={handleEditTodoChange}
                />
                <button type="submit" data-testid="submit-button">
                  제출
                </button>
                <button
                  type="button"
                  data-testid="cancel-button"
                  onClick={handleEditTodoCancel}
                >
                  취소
                </button>
              </form>
            ) : (
              <>
                <label>
                  <input type="checkbox" defaultChecked={todo.isCompleted} />
                  <span>{todo.todo}</span>
                </label>
                <button
                  onClick={() => {
                    setEditingTodoId(todo.id);
                    setEditingTodoText(todo.todo);
                  }}
                >
                  수정
                </button>
                <button onClick={() => deleteTodo(todo.id)}>삭제</button>
              </>
            )}
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
