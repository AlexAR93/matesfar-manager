
import { useBoardStore, useTaskStore, useTaskTaskBoard } from '../../../../hooks';
import { TaskCard } from './TaskCard';

export const BoardContainer = ({tasks}) => {
    const { activeBoard} = useBoardStore();
    const { updateTask, addTask, deleteTask, deleteSubtask, addSubtask, reloadTask } = useTaskStore();
  
    const { newTaskTitle, setNewTaskTitle, handleAddTask } = useTaskTaskBoard(activeBoard, addTask);
  return (
    <div className="board-container">
    {/* Formulario para crear una nueva tarea */}
        <div className="mt-3 mx-3 d-flex gap-2 align-items-center">
        <input
        type="text"
        className="form-control py-2 m-0"
        placeholder="Nueva tarea"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddTask}>
        Agregar
        </button>
        </div>
        <div className="mt-3 d-flex gap-2 flex-wrap justify-content-center">
        {
        tasks.length>0?(
        tasks.map((task) => (
            <TaskCard key={task.id} updateTask={updateTask} deleteSubtask={deleteSubtask} task={task} addSubtask={addSubtask} deleteTask={deleteTask} reloadTask={reloadTask} />
        ))
        ):(
        <h3 className="no-boards">
            Empieza creando una tarea
        </h3>
        )
        }
        </div>
    </div>
  )
}
