import { useNavigate } from "react-router-dom";

export const useBoardNavigation = () => {
  const navigate = useNavigate();

  const goToBoard = (boardId) => navigate(`/tablero/${boardId}`);
  const goToCalendar = () => navigate("/calendario");

  return { goToBoard, goToCalendar };
};
