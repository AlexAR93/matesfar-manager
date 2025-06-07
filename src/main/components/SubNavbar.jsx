
import { useEffect} from "react";
import { Link, useLocation } from "react-router-dom"; // Importar Link de react-router-dom

import './SubNavbar.css';
import { BoardsList } from "./BoardsList";
import { useBoardStore } from "../../hooks";
import { useSubNavbar } from "../../hooks/useSubNavbar";

export const SubNavbar = () => {
  const { menuExpanded, toggleMenu, expandedSubMenus, toggleSubMenu, closeBoardSubMenu } =
    useSubNavbar();
  const location = useLocation();
  const { setActiveBoard } = useBoardStore();

  useEffect(() => {
    if (location.pathname === "/calendario") {
      setActiveBoard(null); // Limpiar pizarra activa para ir a calendario
    }
  }, [location]);

  return (
    <div
      className={`menu-container ${menuExpanded && "bg-dark"}`}
      style={{ width: menuExpanded ? "300px" : "50px" }}
    >
      <button onClick={toggleMenu} className={`open-icon ${menuExpanded && "bg-dark"}`}>
        {menuExpanded ? "Cerrar" : ">"}
      </button>
      <div>
        {menuExpanded && (
          <ul className="menu d-flex flex-column gap-1">
            <li>
                <Link onClick={()=>closeBoardSubMenu("boards")} to="/calendario" className="text-decoration-none">
                  <button className="submenu-button text-dark fw-bold">Calendario</button>
                </Link>
   
            </li>
            <li>
              <Link onClick={()=>closeBoardSubMenu("boards")} to="/products-manager" className="text-decoration-none">
                <button className="submenu-button text-dark fw-bold">Mis productos</button>
              </Link>  
            </li>
            <li>
              <button
                className="submenu-button fw-bold"
                onClick={() => toggleSubMenu("boards")}
              >
                Sus tableros {expandedSubMenus["boards"] ? "▲" : "▼"}
              </button>
              {expandedSubMenus["boards"] && <BoardsList />}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};



// import { useEffect} from "react";
// import { Link, useLocation } from "react-router-dom"; // Importar Link de react-router-dom

// import './SubNavbar.css';
// import { BoardsList } from "./BoardsList";
// import { useBoardStore } from "../../hooks";
// import { useSubNavbar } from "../../hooks/useSubNavbar";

// export const SubNavbar = () => {
//   const { menuExpanded, toggleMenu, expandedSubMenus, toggleSubMenu, closeBoardSubMenu } =
//     useSubNavbar();
//   const location = useLocation();
//   const { setActiveBoard } = useBoardStore();

//   useEffect(() => {
//     if (location.pathname === "/calendario") {
//       setActiveBoard(null); // Limpiar pizarra activa al ir al calendario
//     }
//   }, [location]);

//   return (
//     <div
//       className={`menu-container ${menuExpanded && "bg-dark"}`}
//       style={{ width: menuExpanded ? "300px" : "50px" }}
//     >
//       <button onClick={toggleMenu} className={`open-icon ${menuExpanded && "bg-dark"}`}>
//         {menuExpanded ? "Cerrar" : ">"}
//       </button>
//       <div>
//         {menuExpanded && (
//           <ul className="menu d-flex flex-column gap-1">
//             <li>
//                 <Link onClick={()=>closeBoardSubMenu("boards")} to="/calendario" className="text-decoration-none">
//                   <button className="submenu-button text-dark fw-bold">Calendario</button>
//                 </Link>
   
//             </li>
//             <li>
//               <button
//                 className="submenu-button fw-bold"
//                 onClick={() => toggleSubMenu("boards")}
//               >
//                 Sus tableros {expandedSubMenus["boards"] ? "▲" : "▼"}
//               </button>
//               {expandedSubMenus["boards"] && <BoardsList />}
//             </li>
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };
