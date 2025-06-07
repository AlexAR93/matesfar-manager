import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { 
    onLoadBoards, 
    onSetActiveBoard, 
    onAddNewBoard, 
    onUpdateBoard, 
    onDeleteBoard ,
    onLoadBoardsState,
    onLogoutTasks
} from '../store';

export const useBoardStore = () => {
    const dispatch = useDispatch();
    const { boards, activeBoard, isLoadingBoards } = useSelector(state => state.board);

    const startLoadingBoards = async () => {
        dispatch(onLoadBoardsState(true))
        try {
            const { data } = await calendarApi.get('/pizarras');
            dispatch(onLoadBoards(data.boards));
            dispatch(onLoadBoardsState(false))
        } catch (error) {
            console.error('Error cargando las pizarras:', error);
            dispatch(onLoadBoardsState(false))
        }
    };

    const setActiveBoard = (board) => {
        dispatch(onSetActiveBoard(board));
    };

    const addNewBoard = async (board) => {
        try {
            const { data } = await calendarApi.post('/pizarras', board);
            dispatch(onAddNewBoard(await data.board));
            dispatch(onSetActiveBoard(await data.board.id));
            return data
        } catch (error) {
            console.error('Error agregando la nueva pizarra:', error);
        }
    };

    //!Lograr actualizar titulo de pizarra
    const updateBoard = async (activeBoard,board) => {
        try {
            const { data } = await calendarApi.put(`/pizarras/${activeBoard}`, board);
            dispatch(onUpdateBoard(data.board));
        } catch (error) {
            console.error('Error actualizando la pizarra:', error);
        }
    };

    const deleteBoard = async () => {
        const boardToDelete=confirm('¿Seguro quiere eliminar esta pizarra?')
        if (!boardToDelete) return;
        try {
            await calendarApi.delete(`/pizarras/${activeBoard}`);
            dispatch(onDeleteBoard(activeBoard));
            dispatch(onLogoutTasks(activeBoard));
            dispatch(onSetActiveBoard(null));
        } catch (error) {
            console.error('Error eliminando la pizarra:', error);
        }
    };

    return {
        //* Propiedades
        boards,
        activeBoard,
        isLoadingBoards,
        
        //* Métodos
        startLoadingBoards,
        setActiveBoard,
        addNewBoard,
        updateBoard,
        deleteBoard
    };
};


// import { useDispatch, useSelector } from 'react-redux';
// import { calendarApi } from '../api';
// import { 
//     onLoadBoards, 
//     onSetActiveBoard, 
//     onAddNewBoard, 
//     onUpdateBoard, 
//     onDeleteBoard ,
//     onLoadBoardsState,
//     onLogoutTasks
// } from '../store';

// export const useBoardStore = () => {
//     const dispatch = useDispatch();
//     const { boards, activeBoard, isLoadingBoards } = useSelector(state => state.board);

//     const startLoadingBoards = async () => {
//         dispatch(onLoadBoardsState(true))
//         try {
//             const { data } = await calendarApi.get('/pizarras');
//             dispatch(onLoadBoards(data.boards));
//             dispatch(onLoadBoardsState(false))
//         } catch (error) {
//             console.error('Error cargando las pizarras:', error);
//             dispatch(onLoadBoardsState(false))
//         }
//     };

//     const setActiveBoard = (board) => {
//         dispatch(onSetActiveBoard(board));
//     };

//     const addNewBoard = async (board) => {
//         try {
//             const { data } = await calendarApi.post('/pizarras', board);
//             dispatch(onAddNewBoard(data.board));
//             return data.board;
//         } catch (error) {
//             console.error('Error agregando la nueva pizarra:', error);
//         }
//     };

//     //!Lograr actualizar titulo de pizarra
//     const updateBoard = async (activeBoard,board) => {
//         try {
//             const { data } = await calendarApi.put(`/pizarras/${activeBoard}`, board);
//             dispatch(onUpdateBoard(data.board));
//         } catch (error) {
//             console.error('Error actualizando la pizarra:', error);
//         }
//     };

//     const deleteBoard = async () => {
//         const boardToDelete=confirm('¿Seguro quiere eliminar esta pizarra?')
//         if (!boardToDelete) return;
//         try {
//             await calendarApi.delete(`/pizarras/${activeBoard}`);
//             dispatch(onDeleteBoard(activeBoard));
//             dispatch(onLogoutTasks(activeBoard));
//             setActiveBoard(null)
//         } catch (error) {
//             console.error('Error eliminando la pizarra:', error);
//         }
//     };

//     return {
//         //* Propiedades
//         boards,
//         activeBoard,
//         isLoadingBoards,
        
//         //* Métodos
//         startLoadingBoards,
//         setActiveBoard,
//         addNewBoard,
//         updateBoard,
//         deleteBoard
//     };
// };
