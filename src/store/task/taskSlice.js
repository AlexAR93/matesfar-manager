import { createSlice } from '@reduxjs/toolkit';

export const taskSlice = createSlice({
  name: 'task',
  initialState: {
    isLoadingTasks: false,
    tasks: [],
  },
  reducers: {
    onLoadTasksState:(state,{payload})=>{
      state.isLoadingTasks=payload;
  },
    onAddNewTask: (state, { payload }) => {
      state.tasks.push(payload);
    },
    onUpdateTask: (state, { payload }) => {
      state.tasks = state.tasks.map((task) =>
        task.id === payload.id ? payload : task
      );
    },
    onDeleteTask: (state,{payload}) => {
        state.tasks = state.tasks.filter((task) => task.id !== payload);
    },
    onDeleteSubtask: (state, { payload }) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id == payload.taskId) {

          task.taskList = task.taskList.filter((subtask)=> {
            return subtask._id !== payload.subtaskId});
        }
        return task;
      });
    },    
    onLoadTasks: (state, { payload = [] }) => {
      state.tasks=[]
      payload.forEach((task) => {
        const exists = state.tasks.some((dbTask) => dbTask.id == task.id);
        if (!exists) {;
            state.tasks.push(task);
        }
      });
    },
    onLogoutTasks: (state) => {
      state.tasks = [];
    }
  },
});

export const {
  onAddNewTask,
  onDeleteTask,
  onLoadTasks,
  onUpdateTask,
  onSetActiveBoardId,
  onLoadTasksState,
  onDeleteSubtask,
  onLogoutTasks
} = taskSlice.actions;