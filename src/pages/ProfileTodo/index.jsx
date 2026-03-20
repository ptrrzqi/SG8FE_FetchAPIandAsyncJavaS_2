import React, { useEffect, useRef, useState } from "react";
import ProfileCard from "./partials/ProfileCard";
import TodoList from "./partials/Todolist";

const ProfileTodo = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("isDarkmode");
    return savedMode === "true";
  });

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isDarkmode", isDarkMode);
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <main className="h-screen bg-bgCard dark:bg-bgCardDark flex justify-center items-center">
      <section className="flex flex-wrap justify-center items-center gap-3 md:flex-nowrap m-3.5 h-fit">
        <ProfileCard isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <TodoList inputRef={inputRef} />
      </section>
    </main>
  );
};

export default ProfileTodo;
