import { useState } from "react";

export const useTaskTaskBoard = (activeBoard,addTask) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const handleAddTask = async () => {
        if (!newTaskTitle.trim()) return; // No agregar tarea si el título está vacío
    
        // Crear una nueva tarea con un array vacío de subtareas
        const newTask = {
          title: newTaskTitle,
          taskList: [], // Subtareas vacías
          from: activeBoard
        };
        // Usar la función de Redux para agregar la tarea al estado global
        await addTask(newTask);
    
        // Limpiar el input del título de la tarea
        setNewTaskTitle("");
      };
  return {
    handleAddTask,
    setNewTaskTitle
  }
}
