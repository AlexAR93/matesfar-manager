import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBoardStore, useTaskStore } from "../../../../hooks";
import './BoardPage.css';
import { FabDelete, BoardContainer, BoardTitle } from "../components";
import { Loading } from "../../../components";

export const BoardPage = () => {
  const { id } = useParams();
  const { boards,activeBoard,setActiveBoard} = useBoardStore();
  const { isLoadingTasks, startLoadingTasks, tasks } = useTaskStore();
  const navigate=useNavigate()

  useEffect(() => {
    id!=activeBoard&&(
      setActiveBoard(id)
    )
  }, [id])

  useEffect(() => {
    activeBoard&&(
      navigate(`/tablero/${activeBoard}`),
      startLoadingTasks(activeBoard)
    );
  }, [activeBoard])
  

  if (isLoadingTasks) {
    return <Loading text={"Cargando Tareas"} />;
  }

  if (activeBoard) {
    return (
      <div className="board text-center w-100 bg-dark">
        <BoardTitle boards={boards} id={id} />
        <BoardContainer tasks={tasks}  />
        <FabDelete />
      </div>
    );
  }

  return (
    <div className="no-boards text-center">
      <p>Crea o selecciona un tablero</p>
    </div>
  );
};

export default BoardPage;

// import { useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useBoardStore, useTaskStore } from "../../../../hooks";
// import './BoardPage.css';
// import { FabDelete, BoardContainer, BoardTitle } from "../components";
// import { Loading } from "../../../components";

// export const BoardPage = () => {
//   const { id } = useParams(); // Obtener el ID del tablero desde la URL
//   const { activeBoard,setActiveBoard,startLoadingBoards} = useBoardStore();
//   const { isLoadingTasks, startLoadingTasks } = useTaskStore();
//   const navigate=useNavigate()
//   useEffect(() => {
//     if(id){
//       if (!activeBoard && id) {
//         startLoadingBoards();
//         setActiveBoard(id);
//       }
//       if (id) {
//         startLoadingTasks(id);
//       }
//     }else{
//       console.log('entre')        
//       navigate('/tablero')
//     }
//     console.log('s',id)
//   }, [id, activeBoard]);
  

//   if (isLoadingTasks) {
//     return <Loading text={"Cargando Tareas"} />;
//   }

//   if (activeBoard) {
//     return (
//       <div className="board text-center w-100 bg-dark">
//         <BoardTitle />
//         <BoardContainer />
//         <FabDelete />
//       </div>
//     );
//   }

//   return (
//     <div className="no-boards text-center">
//       <p>Crea o selecciona un tablero</p>
//     </div>
//   );
// };

// export default BoardPage;
