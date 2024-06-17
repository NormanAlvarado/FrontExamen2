import './App.css';
import Navbar from './Components/Navbar';
import DashboardPage from './Pages/DashboardPage';
import TicketPage from './Pages/TicketPage';
import { QueryClient, QueryClientProvider } from "react-query";
import AppRouter from './Routes/AppRouter';

const queryClient = new QueryClient()

function App() {


  return (
    <>
      <QueryClientProvider client={queryClient}>
      <AppRouter/>
      </QueryClientProvider>
    </>
  )
}

export default App
