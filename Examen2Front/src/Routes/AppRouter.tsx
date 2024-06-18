// components/AppRouter.tsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from '../Components/Navbar';
import TicketPage from '../Pages/TicketPage'; // Asegúrate de importar las páginas correctamente
import DashboardPage from '../Pages/DashboardPage';
import { useAppRoutes } from '../hooks/useAppRoute';

const AppRouter: React.FC = () => {
  const { appRoutes, error } = useAppRoutes();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <BrowserRouter>
      <Navbar /> 
      <Routes>
        {appRoutes.map(route => (
          <Route
            key={route.id}
            path={route.path}
            element={route.path === '/' ? <TicketPage /> : <DashboardPage />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
