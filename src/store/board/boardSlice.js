import { createSlice } from '@reduxjs/toolkit';

export const boardSlice = createSlice({
    name: 'board',
    initialState: {
        isLoadingBoards: false,
        boards: [],
        activeBoard: null
    },
    reducers: {
        onLoadBoardsState:(state,{payload})=>{
            state.isLoadingBoards=payload;
        },
        onSetActiveBoard: (state, { payload }) => {
            state.activeBoard = payload;
        },
        onAddNewBoard: (state, { payload }) => {
            state.boards.push(payload);
            
        },
        onUpdateBoard: (state, { payload }) => {
            state.boards = state.boards.map(board => 
                board.id === payload.id ? payload : board
            );
        },
        onDeleteBoard: (state,{payload}) => {

                state.boards = state.boards.filter(board => board.id !== payload);
                 
            
        },
        onLoadBoards: (state, { payload = [] }) => {
            state.boards = [
                ...state.boards,
                ...payload.filter(board => 
                    !state.boards.some(existingBoard => existingBoard.id === board.id)
                )
            ];
        },
        onLogoutBoard: (state) => {
            state.boards = [];
            
        }
    }
});

export const {
    onSetActiveBoard,
    onAddNewBoard,
    onUpdateBoard,
    onDeleteBoard,
    onLoadBoards,
    onLogoutBoard,
    onLoadBoardsState
} = boardSlice.actions;


// import { createSlice } from '@reduxjs/toolkit';

// export const boardSlice = createSlice({
//     name: 'board',
//     initialState: {
//         isLoadingBoards: false,
//         boards: [],
//         activeBoard: null
//     },
//     reducers: {
//         onLoadBoardsState:(state,{payload})=>{
//             state.isLoadingBoards=payload;
//         },
//         onSetActiveBoard: (state, { payload }) => {
//             state.activeBoard = payload;
//         },
//         onAddNewBoard: (state, { payload }) => {
//             state.boards.push(payload);
//             state.activeBoard = payload.id;
//         },
//         onUpdateBoard: (state, { payload }) => {
//             state.boards = state.boards.map(board => 
//                 board.id === payload.id ? payload : board
//             );
//         },
//         onDeleteBoard: (state,{payload}) => {

//                 state.boards = state.boards.filter(board => board.id !== payload);
//                 state.activeBoard = null; 
            
//         },
//         onLoadBoards: (state, { payload = [] }) => {
//             state.boards = [
//                 ...state.boards,
//                 ...payload.filter(board => 
//                     !state.boards.some(existingBoard => existingBoard.id === board.id)
//                 )
//             ];
//         },
//         onLogoutBoard: (state) => {
//             state.boards = [];
//             state.activeBoard = null;
//         }
//     }
// });

// export const {
//     onSetActiveBoard,
//     onAddNewBoard,
//     onUpdateBoard,
//     onDeleteBoard,
//     onLoadBoards,
//     onLogoutBoard,
//     onLoadBoardsState
// } = boardSlice.actions;
