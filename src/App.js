import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import LandingPage from './components/landingPage';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Sign from './components/Signup';
import TicketMangement from './components/Ticket';
import TicketList from './components/TicketList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Sign />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ticket" element={<TicketMangement />} />
        <Route path="/ticketList" element={<TicketList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
