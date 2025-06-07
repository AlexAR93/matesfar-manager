import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api"; // Supongo que tienes esta configuración de axios.
import { onAddNewTask, onDeleteTask, onLoadTasks, onUpdateTask, onLoadTasksState,onDeleteSubtask } from "../store";

export const useTaskStore = () => {
  const dispatch = useDispatch();
  const { tasks, isLoadingTasks } = useSelector((state) => state.task);
  const startLoadingTasks = async (boardId) => {
    if (!boardId) return;
    dispatch(onLoadTasksState(true))
    try {
      const { data } = await calendarApi.get(`/tareas/${boardId}`); // Corregí la ruta según el controlador
      const tasks = data.tasks;
      dispatch(onLoadTasks(tasks));
      dispatch(onLoadTasksState(false))
    } catch (error) {
      console.error("Error cargando las tareas:", error);
    }
  };

  const addTask = async (newTask) => {
    try {
      const { data } = await calendarApi.post("/tareas", newTask); // Agregar tarea
      dispatch(onAddNewTask(data.task));
    } catch (error) {
      console.error("Error agregando la tarea:", error);
    }
  };

  const addSubtask = async (taskId,newSubtask) => {
    try {
      const { data } = await calendarApi.post(`/tareas/${taskId}`, {text:newSubtask}); // Agregar tarea
      dispatch(onUpdateTask(data.task));
    } catch (error) {
      console.error("Error agregando la tarea:", error);
    }
  };

  const updateTask = async (taskId, newData) => {
    try {
        const { data } = await calendarApi.put(`/tareas/${taskId}`, newData); // Enviar los datos de la tarea y la subtarea
        
        dispatch(onUpdateTask(data.task)); // Actualizar la tarea en el estado global
    } catch (error) {
        console.error("Error actualizando la tarea:", error);
    }
};

const deleteSubtask = async (taskId,subtaskId) => {
  try {
    await calendarApi.delete(`/tareas/${taskId}/${subtaskId}`);
    dispatch(onDeleteSubtask({taskId:taskId,subtaskId:subtaskId}));
  } catch (error) {
    console.error("Error eliminando la tarea:", error);
  }
};


  const reloadTask= async()=>{
    dispatch(onLoadTasks(tasks))
  }

  const deleteTask = async (taskId) => {
    const taskToDelete=confirm('¿Seguro quiere eliminar esta tarea?')
    try {
      if (taskToDelete) {
        await calendarApi.delete(`/tareas/${taskId}`); // Eliminar tarea
        dispatch(onDeleteTask(taskId));
        // startLoadingTasks(activeBoard)

      }
    } catch (error) {
      console.error("Error eliminando la tarea:", error);
    }
  };

  return {
    tasks,
    isLoadingTasks,
    startLoadingTasks,
    addTask, // Método para agregar tareas
    updateTask, // Método para actualizar tareas
    deleteTask, // Método para eliminar tareas
    deleteSubtask,
    addSubtask,
    reloadTask
  };
};