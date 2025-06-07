import { useEffect } from "react";
import { useBoardStore, useForm} from "../../hooks";
import {Loading} from "./";
import { useNavigate} from "react-router-dom";
import { useState } from "react";

const boardNameFormat = {
  boardName: ''
};

export const BoardsList = () => {
  const {
    boards,
    startLoadingBoards,
    activeBoard,
    addNewBoard,
    setActiveBoard,
    isLoadingBoards,
  } = useBoardStore();

  const { boardName, onInputChange, onResetForm } = useForm(boardNameFormat);

  const navigate = useNavigate();

  const [currentBoardId, setCurrentBoardId] = useState('');

  useEffect(() => {
    // Cargar las pizarras al montar el componente
    startLoadingBoards();
  }, []);

  useEffect(() => {
    // Sincronizar el tablero activo con el estado local
    setCurrentBoardId(activeBoard);
  }, [activeBoard]);

  const handleSelectBoard = (boardId) => {
    // Cambiar el tablero activo
    setActiveBoard(boardId);
    navigate(('/tablero'))
  };

  const handleAddBoard = async () => {
    // Crear una nueva pizarra y resetear el formulario
    const newBoard = await addNewBoard({ name: boardName });
    if (newBoard) {
      onResetForm();
    }
  };

  if (isLoadingBoards) {
    return <Loading />;
  }

  return (
    <div className="board-list-container">
      <div className="d-flex justify-content-center gap-2 my-2">
        <input
          className="form-control w-50"
          type="text"
          placeholder="Pizarra nueva"
          name="boardName"
          value={boardName}
          onChange={onInputChange}
        />
        <button className="btn btn-primary" onClick={handleAddBoard}>
          Crear
        </button>
      </div>
      <div className="board-list">
        <ul className="list-group m-auto w-75">
          {boards.length > 0 ? (
            boards.map((board) => (
              <li
                className={`list-group-item list-group-item-action ${
                  board.id === currentBoardId ? "active" : ""
                }`}
                key={board.id}
                onClick={() => handleSelectBoard(board.id)}
              >
                {board.name}
              </li>
            ))
          ) : (
            <li className="no-boards">
              No hay tableros disponibles
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

// import { useEffect } from "react";
// import { useBoardStore, useForm} from "../../hooks";
// import {Loading} from "./";
// import { useNavigate, useParams } from "react-router-dom";
// import { useState } from "react";

// const boardNameFormat = {
//   boardName: ''
// };

// export const BoardsList = () => {
//   const {
//     boards,
//     startLoadingBoards,
//     activeBoard,
//     addNewBoard,
//     setActiveBoard,
//     isLoadingBoards,
//   } = useBoardStore();
  
//   const { boardName, onInputChange, onResetForm } = useForm(boardNameFormat);

//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [currentBoardId, setCurrentBoardId] = useState('');

//   useEffect(() => {
//     // Cargar las pizarras al montar el componente
//     startLoadingBoards();
//   }, []);

//   useEffect(() => {
//     // Establecer el tablero activo a partir de la URL
//     if (id) {
//       setActiveBoard(id);
//     }
//   }, [id]);

//   useEffect(() => {
//     // Sincronizar el tablero activo con el estado local
//     setCurrentBoardId(activeBoard);
//   }, [activeBoard]);

//   useEffect(() => {
//     // Navegar automáticamente al tablero activo
//     if (currentBoardId) {
//       navigate(`/tablero/${currentBoardId}`);
//     }
//   }, [currentBoardId, navigate]);

//   const handleSelectBoard = (boardId) => {
//     // Cambiar el tablero activo
//     setActiveBoard(boardId);
//   };

//   const handleAddBoard = async () => {
//     // Crear una nueva pizarra y resetear el formulario
//     const newBoard = await addNewBoard({ name: boardName });
//     if (newBoard) {
//       onResetForm(); // Limpiar el input
//     }
//   };

//   if (isLoadingBoards) {
//     return <Loading />;
//   }

//   return (
//     <div className="board-list-container">
//       <div className="d-flex justify-content-center gap-2 my-2">
//         <input
//           className="form-control w-50"
//           type="text"
//           placeholder="Pizarra nueva"
//           name="boardName"
//           value={boardName}
//           onChange={onInputChange}
//         />
//         <button className="btn btn-primary" onClick={handleAddBoard}>
//           Crear
//         </button>
//       </div>
//       <div className="board-list">
//         <ul className="list-group m-auto w-75">
//           {boards.length > 0 ? (
//             boards.map((board) => (
//               <li
//                 className={`list-group-item list-group-item-action ${
//                   board.id === currentBoardId ? "active" : ""
//                 }`}
//                 key={board.id}
//                 onClick={() => handleSelectBoard(board.id)}
//               >
//                 {board.name}
//               </li>
//             ))
//           ) : (
//             <li className="no-boards" style={{ padding: "10px", color: "#555" }}>
//               No hay tableros disponibles
//             </li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };