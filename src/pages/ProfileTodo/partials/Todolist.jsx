import React, { useMemo, useState, useEffect } from "react";
import Button from "../../../components/Button";
import NoItem from "../../../components/atoms/NoItem";
import TodoItem from "../../../components/atoms/TodoItem";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

const TodoList = ({ inputRef }) => {
  const [isAscending, setIsAscending] = useState(true);
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}?_limit=5`);
      const formattedTodos = response.data.map(todo => ({
        id: todo.id,
        deskripsi: todo.title,
        completed: todo.completed || false
      }));
      setList(formattedTodos);
      setError("");
    } catch (err) {
      setError("Gagal memuat todos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateTodoText = async (id, newText) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, {
        title: newText
      });
      return {
        id: response.data.id,
        deskripsi: response.data.title,
        completed: response.data.completed
      };
    } catch (err) {
      throw new Error("Gagal mengupdate teks todo");
    }
  };

  const toggleCompleteStatus = async (id, currentStatus) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, {
        completed: !currentStatus
      });
      return response.data.completed;
    } catch (err) {
      throw new Error("Gagal mengupdate status");
    }
  };

  const addTodoHandler = async () => {
    if (!todo.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post(API_URL, {
        title: todo,
        completed: false,
        userId: 1
      });
      const newTodo = {
        id: response.data.id,
        deskripsi: response.data.title,
        completed: response.data.completed
      };
      const updatedList = [...list, newTodo];
      setList(updatedList);
      setTodo("");
      setError("");
    } catch (err) {
      setError("Gagal menambah todo");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      const filterTodo = list.filter((item) => item.id !== id);
      setList(filterTodo);
      setError("");
    } catch (err) {
      setError("Gagal menghapus todo");
      console.error(err);
    }
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditText(item.deskripsi);
  };

  const saveEdit = async (id) => {
    if (!editText.trim()) return;
    setLoading(true);
    try {
      const updatedTodo = await updateTodoText(id, editText);
      setList(list.map(item => 
        item.id === id ? updatedTodo : item
      ));
      setEditingId(null);
      setEditText("");
      setError("");
    } catch (err) {
      setError("Gagal mengupdate todo");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const toggleComplete = async (id, currentStatus) => {
    try {
      const newStatus = await toggleCompleteStatus(id, currentStatus);
      setList(list.map(item => 
        item.id === id 
          ? { ...item, completed: newStatus }
          : item
      ));
      setError("");
    } catch (err) {
      setError("Gagal mengupdate status");
      console.error(err);
    }
  };

  const sortedTodo = useMemo(() => {
    return [...list].sort((a, b) => {
      if (isAscending) return a.id - b.id;
      return b.id - a.id;
    });
  }, [list, isAscending]);

  return (
    <div className="border border-borderColor dark:border-borderColorDark md:h-85 w-full bg-bgCard dark:bg-bgCardDark p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-colors duration-300 flex flex-col">
      <h3 className="font-bold text-xl mb-4 text-textPrimary dark:text-textPrimaryDark">
        <span className="w-2 h-6 bg-accent rounded-full inline-block align-middle mr-1"></span>
        My Tasks
      </h3>

      {error && (
        <div className="mb-4 p-2 bg-error/10 text-error rounded-lg text-sm">
          {error}
        </div>
      )}

      {loading && (
        <div className="mb-4 text-center text-textSecondary dark:text-textSecondaryDark">
          Loading...
        </div>
      )}

      <div className="flex gap-2 mb-4 w-full shrink-0">
        <input
          ref={inputRef}
          type="text"
          value={todo}
          placeholder="Tulis tugas baru..."
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodoHandler()}
          disabled={loading}
          className="flex-1 p-3 border border-borderColor dark:border-borderColorDark rounded-lg outline-none bg-transparent text-textPrimary dark:text-textPrimaryDark placeholder-textSecondary dark:placeholder-textSecondaryDark focus:border-accent transition-colors duration-200 disabled:opacity-50"
        />

        <div className="flex gap-2">
          <Button
            variant="warning"
            onClick={() => setIsAscending(!isAscending)}
            className="flex-1 sm:flex-none justify-center"
            disabled={loading}
          >
            {isAscending ? "Oldest" : "Newest"}
          </Button>

          <Button
            variant="primary"
            onClick={addTodoHandler}
            className="flex-1 sm:flex-none justify-center"
            disabled={loading}
          >
            Add
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {list.length === 0 ? (
          <NoItem />
        ) : (
          <ul className="flex flex-col gap-3 overflow-y-auto pr-2 h-50 md:h-full [scrollbar-width:thin] [scrollbar-color:var(--color-textSecondary)_transparent]">
            {sortedTodo.map((item, index) => (
              <TodoItem
                key={item.id}
                id={index + 1}
                item={item}
                deleteTodo={deleteTodo}
                startEditing={startEditing}
                editingId={editingId}
                editText={editText}
                setEditText={setEditText}
                saveEdit={saveEdit}
                cancelEdit={cancelEdit}
                toggleComplete={toggleComplete}
                loading={loading}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodoList;