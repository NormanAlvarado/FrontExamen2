import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "../Pages/DashboardPage";
import TicketPage from "../Pages/TicketPage";
import Navbar from "../Components/Navbar";


const AppRouter: React.FC = () => {
    

   

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navbar />} >
                
                    <Route path="/" element={<TicketPage/>}/>
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;