import './App.css';
import TicketPage from './Pages/TicketPage';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient()

function App() {


  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TicketPage />
      </QueryClientProvider>
    </>
  )
}

export default App
