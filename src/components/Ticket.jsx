import "./Ticket.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Mobile from "./mobile";

const TicketManagement = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const session = localStorage.getItem("ticketapp_session");
    const storedUser = JSON.parse(localStorage.getItem("ticketapp_user"));

    if (!session || !storedUser) {
      navigate("/login");
      return;
    }

    setUser(storedUser);

    const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(storedTickets);
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !status) {
      setMessage("Title and status are required.");
      return;
    }

    const newTicket = {
      title,
      description,
      status,
      createdBy: user?.username,
      id: editingIndex !== null ? tickets[editingIndex].id : Date.now(),
    };

    let updatedTickets;
    if (editingIndex !== null) {
      updatedTickets = [...tickets];
      updatedTickets[editingIndex] = newTicket;
      setEditingIndex(null);
      setMessage("Ticket updated successfully!");
    } else {
      updatedTickets = [...tickets, newTicket];
      setMessage("Ticket created successfully!");
    }

    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));

    setTitle("");
    setDescription("");
    setStatus("");
  };

  const handleEdit = (index) => {
    const ticket = tickets[index];
    setTitle(ticket.title);
    setDescription(ticket.description);
    setStatus(ticket.status);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      const updatedTickets = tickets.filter((_, i) => i !== index);
      setTickets(updatedTickets);
      localStorage.setItem("tickets", JSON.stringify(updatedTickets));
      setMessage("Ticket deleted successfully!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session");
    alert("You have been logged out.");
    navigate("/login");
  };

  return (
    <div id="ticket">
      <Mobile/>
      <div id="container">
        <aside>
          <h1>Ticketly</h1>
          <div>
            <nav>
              <h4 onClick={() => navigate("/dashboard")}>Dashboard</h4>
              <h4 onClick={() => navigate("/ticket")}>Create Ticket</h4>
              <h4 onClick={() => navigate("/ticketlist")}>Tickets Lists</h4>
            </nav>
            <h4 onClick={handleLogout}>Logout</h4>
          </div>
        </aside>

        <main>
          <div>
            <h1>TICKETS</h1>
            <h2>Welcome, {user?.username || "User"}</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <legend>{editingIndex !== null ? "Edit Ticket" : "Create Ticket"}</legend>

            <nav>
              <label>Title</label>
              <input
                type="text"
                placeholder="Enter ticket title"
                required
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </nav>

            <nav>
              <label>Description</label>
              <input
                type="text"
                placeholder="Describe the issue or request"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </nav>

            <nav>
              <label>Status</label>
              <select
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select status</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </nav>

            <nav>
              <button type="submit">
                {editingIndex !== null ? "Update Ticket" : "Submit"}
              </button>
            </nav>

            {message && <p style={{ color: "green" }}>{message}</p>}
          </form>
        </main>
      </div>
      <footer>
          <h4>Ticketly</h4>
          <p>Privacy Policy</p>
          <p>Terms</p>
          <p>&copy; copyright 2025 Ticketly</p>
      </footer>
      <p>Code with Love and Peace by AbdulMalik</p>
    </div>
  );
};

export default TicketManagement;
