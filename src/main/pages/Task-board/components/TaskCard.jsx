import { useState } from "react";
import { useForm } from "../../../../hooks";
import './Task.css';

export const TaskCard = ({ updateTask, deleteSubtask, task, addSubtask, deleteTask, reloadTask }) => {
  const [editingSubtask, setEditingSubtask] = useState(null);
  const [subTaskText, setSubTaskText] = useState("");
  const [editingTitle, setEditingTitle] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);

  const { inputText, formState, onInputChange } = useForm("");

  const handleSubTaskFocus = (subtask) => {
    setEditingSubtask(subtask._id);
    setSubTaskText(subtask.text);
  };

  const handleSubTaskBlur = (taskId, subtaskId) => {
    const updatedTaskList = task.taskList.map(subtask => 
        subtask._id === subtaskId ? { ...subtask, text: subTaskText } : subtask
    );

    updateTask(taskId, { taskList: updatedTaskList });

    setEditingSubtask(null);
};



  const handleAddSubtask = (taskId) => {
    const text = formState[`inputText${taskId}`];
    addSubtask(taskId, text);
  };

  const handleDeleteSubtask = (taskId, subtaskId) => {
    deleteSubtask(taskId, subtaskId);
    reloadTask();
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
    reloadTask();
  };

  const handleTitleBlur = () => {
    updateTask(task.id, { title: taskTitle });
    setEditingTitle(false);
  };

  return (
    <div className="task-card d-flex flex-column justify-content-between position-relative">
      <div className="header">
        {editingTitle ? (
          <input
            type="text"
            className="form-control"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onBlur={handleTitleBlur}
            autoFocus
          />
        ) : (
          <h3
            className="text-light"
            onClick={() => setEditingTitle(true)} 
          >
            {task.title}
          </h3>
        )}
      </div>
      <hr />
      <div className="subtask">
        <ul className="list-group">
          {task.taskList.map((subtask) => (
            <li
              key={subtask._id}
              className="list-group-item d-flex justify-content-between align-items-center subtask"
            >
              {editingSubtask === subtask._id ? (
                <input
                  type="text"
                  className="mx-2 form-control"
                  value={subTaskText}
                  onChange={(e) => setSubTaskText(e.target.value)}
                  onBlur={() => handleSubTaskBlur(task.id, subtask._id)}
                  autoFocus
                />
              ) : (
                <p className="w-100 m-0" onClick={() => handleSubTaskFocus(subtask)}>
                  {subtask.text}
                </p>
              )}
              <button
                className="btn btn-danger p-2 py-0"
                onClick={() => handleDeleteSubtask(task.id, subtask._id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <div className="add-subtask d-flex gap-3 justify-content-center">
        <input
          type="text"
          placeholder="Agregar nueva subtarea"
          className="form-control"
          name={`inputText${task.id}`}
          value={inputText}
          onChange={(e) => onInputChange(e)}
        />
        <button
          className="btn btn-primary"
          onClick={(e) => handleAddSubtask(task.id)}
        >
          Agregar
        </button>
      </div>
      <aside className="position-absolute m-1 top-0 end-0">
        <button className="btn btn-danger px-2 py-0" onClick={() => handleDeleteTask(task.id)}>
          X
        </button>
      </aside>
    </div>
  );
};
