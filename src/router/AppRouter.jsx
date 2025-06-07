import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage, RegisterPage } from '../auth';
import { useAuthStore } from '../hooks';
import { MainRouter } from '../main/router';
import { Loading } from '../main/components';


export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();
    // const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';

    useEffect(() => {
        checkAuthToken();
    }, [])
    


    if ( status === 'checking' ) {
        return (
            <Loading text={"Ingresando"}/>
        )
    }

    return (
        <Routes>
            {
                ( status === 'not-authenticated')  
                    ? (
                        <>
                            <Route path="/auth/register" element={ <RegisterPage /> } />
                            <Route path="/auth/*" element={ <LoginPage /> } />
                            <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                        </>
                    )
                    : (
                        <>
                            <Route path="/*" element={ <MainRouter /> } />
                        </>
                    )
            }

        </Routes>
    )
}