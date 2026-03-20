import React from "react";
import Button from "../Button";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

export default function TodoItem({ 
  id, 
  item, 
  deleteTodo, 
  startEditing, 
  editingId, 
  editText, 
  setEditText, 
  saveEdit, 
  cancelEdit,
  toggleComplete,
  loading 
}) {
  const isEditing = editingId === item.id;

  return (
    <li className="flex items-center gap-2 p-3 mb-2 bg-bgBody dark:bg-bgBodyDark rounded-lg border-l-4 border-accent shadow-sm animate-slideIn transition-all duration-300 hover:translate-x-1">
      <input
        type="checkbox"
        checked={item.completed || false}
        onChange={() => toggleComplete(item.id, item.completed)}
        disabled={loading}
        className="w-5 h-5 rounded border-borderColor dark:border-borderColorDark text-accent focus:ring-accent cursor-pointer disabled:opacity-50"
      />
      
      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveEdit(item.id)}
            className="w-full p-2 border border-borderColor dark:border-borderColorDark rounded bg-white dark:bg-bgCardDark text-textPrimary dark:text-textPrimaryDark focus:outline-none focus:ring-2 focus:ring-accent"
            autoFocus
            disabled={loading}
          />
        ) : (
          <span className={`font-medium text-textPrimary dark:text-textPrimaryDark break-all pr-4 ${
            item.completed ? 'line-through text-textSecondary dark:text-textSecondaryDark' : ''
          }`}>
            <b>{id}</b> {item.deskripsi}
          </span>
        )}
      </div>

      <div className="flex gap-1">
        {isEditing ? (
          <>
            <Button 
              variant="success" 
              onClick={() => saveEdit(item.id)}
              disabled={loading}
              className="px-3 py-1.5"
            >
              <FaCheck />
            </Button>
            <Button 
              variant="danger" 
              onClick={cancelEdit}
              disabled={loading}
              className="px-3 py-1.5"
            >
              <FaTimes />
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="primary" 
              onClick={() => startEditing(item)}
              disabled={loading}
              className="px-3 py-1.5"
            >
              <FaEdit />
            </Button>
            <Button 
              variant="danger" 
              onClick={() => deleteTodo(item.id)}
              disabled={loading}
              className="px-3 py-1.5"
            >
              <FaTrash />
            </Button>
          </>
        )}
      </div>
    </li>
  );
}