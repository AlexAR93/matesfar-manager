import { useState } from 'react'
import { useBoardStore } from '../../../../hooks';

export const BoardTitle = ({boards,id}) => {
    const { activeBoard, updateBoard} = useBoardStore();
    const [editingBoardName, setEditingBoardName] = useState(false);
    const [boardName, setBoardName] = useState(
        boards.find((board) => board.id === id)?.name
      );

    const handleBoardNameFocus = () => {
        setEditingBoardName(true);
      };
    
      const handleBoardNameBlur = () => {
    
        const oldBoardName=boards.find((board) => board.id === activeBoard).name;
    
        if(boardName===oldBoardName){
          setEditingBoardName(false);
          return
        }
        const updatedBoard = { name: boardName };
    
        updateBoard(activeBoard, updatedBoard);
        setEditingBoardName(false);
    };
  return (
    <>
        {editingBoardName ? (
                <div className="d-flex justify-content-center">
                <input
                    type="text"
                    className="form-control w-auto"
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                    onBlur={handleBoardNameBlur} // Guardar cambios
                    autoFocus
                />
                </div>
            ) : (
                <h2 className="text-light text-uppercase" onClick={handleBoardNameFocus}>{boardName}</h2>
        )}
    </>
  )
}
