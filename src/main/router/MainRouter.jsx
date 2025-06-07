
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar, SubNavbar } from '../components';

import { BoardPage } from '../pages/Task-board/pages/BoardPage';
import { CalendarPage } from '../pages/Calendar';
import { ProductsManager } from '../pages/products-manager';



export const MainRouter = () => {
        return (
          <>
            <Navbar />
            <main className="d-flex mx-2 justify-content-evenly mt-5">
              <SubNavbar /> {/* SubNavbar ahora tiene enlaces */}
              <Routes>
                <Route path="/calendario" element={<CalendarPage />} />
                <Route path="/tablero/:id" element={<BoardPage />} />
                <Route path="/tablero" element={<BoardPage />} />
                <Route path="/products-manager" element={<ProductsManager />} />
                <Route path="/tablero/*" element={<Navigate to="/tablero" />} />
                <Route path="/products-manager/*" element={<Navigate to="/products-manager" />} />
                <Route path="/*" element={<Navigate to="/calendario" />} />
              </Routes>
            </main>
          </>
        );
      };




      


// export const MainRouter = () => {

    
//         return (
//              <>
//                     <Navbar />
//                     <main className="d-flex mx-2 justify-content-evenly mt-5">
//                             <SubNavbar /> {/* SubNavbar ahora tiene enlaces */}
//                             <Routes>
//                             <Route path="/calendario" element={<CalendarPage />} />
//                             <Route path="/tablero/:id" element={<BoardPage />} />
//                             <Route path="/tablero" element={<BoardPage/> } />
//                             <Route path="/tablero/*" element={<Navigate to="/tablero" /> } />
                            
//                             {/* Ruta por defecto, puedes redirigir si lo prefieres */}
//                             <Route path="/*" element={<Navigate to="/calendario" />} />
//                             </Routes>
//                     </main>
//             </>
//         )
//     }