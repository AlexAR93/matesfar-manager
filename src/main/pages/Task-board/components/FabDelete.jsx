import { useNavigate } from 'react-router-dom';
import { useBoardStore} from '../../../../hooks';
import { useDispatch } from 'react-redux';

export const FabDelete = () => {

    const { deleteBoard, setActiveBoard} = useBoardStore();
    const navigate = useNavigate();
    const onDeleteChange=()=>{
      deleteBoard()
      navigate(`/tablero`);
    }
  return (
    <button
        className="btn btn-danger fab-danger"
        onClick={onDeleteChange}
    >
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}