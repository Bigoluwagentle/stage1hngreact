import "./TicketList.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Mobile from "./mobile";

const TicketList = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    title: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    const session = localStorage.getItem("ticketapp_session");
    const storedUser = JSON.parse(localStorage.getItem("ticketapp_user"));
    const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];

    if (!session || !storedUser) {
      navigate("/login");
      return;
    }

    setUser(storedUser);
    setTickets(storedTickets);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session");
    alert("You have been logged out.");
    navigate("/login");
  };

  const handleEdit = (ticket) => {
    setEditingTicket(ticket.id);
    setUpdatedData({
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!updatedData.title || !updatedData.description || !updatedData.status) {
      alert("Please fill all fields before updating.");
      return;
    }

    const updatedTickets = tickets.map((t) =>
      t.id === editingTicket ? { ...t, ...updatedData } : t
    );

    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    setTickets(updatedTickets);
    setEditingTicket(null);
    alert("Ticket updated successfully!");
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ticket?");
    if (!confirmDelete) return;

    const updatedTickets = tickets.filter((t) => t.id !== id);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    setTickets(updatedTickets);
    alert("Ticket deleted successfully!");
  };

  return (
    <div id="ticketlist">
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
            <h1>TICKETS LISTS</h1>
            <h2>Welcome, {user?.username || "User"}</h2>
          </div>

          <section>
            {tickets.length === 0 ? (
              <p>No tickets created yet.</p>
            ) : (
              tickets.map((ticket) => (
                <div key={ticket.id} className="ticket-card">
                  {editingTicket === ticket.id ? (
                    <form onSubmit={handleUpdate}>
                      <nav>
                        <label>Title</label>
                        <input
                          type="text"
                          value={updatedData.title}
                          onChange={(e) =>
                            setUpdatedData({
                              ...updatedData,
                              title: e.target.value,
                            })
                          }
                          required
                        />
                      </nav>

                      <nav>
                        <label>Description</label>
                        <input
                          type="text"
                          value={updatedData.description}
                          onChange={(e) =>
                            setUpdatedData({
                              ...updatedData,
                              description: e.target.value,
                            })
                          }
                          required
                        />
                      </nav>

                      <nav>
                        <label>Status</label>
                        <select
                          value={updatedData.status}
                          onChange={(e) =>
                            setUpdatedData({
                              ...updatedData,
                              status: e.target.value,
                            })
                          }
                          required
                        >
                          <option value="">Select status</option>
                          <option value="open">Open</option>
                          <option value="in_progress">In Progress</option>
                          <option value="closed">Closed</option>
                        </select>
                      </nav>

                      <nav>
                        <button type="submit">Save</button>
                        <button
                          type="button"
                          onClick={() => setEditingTicket(null)}
                        >
                          Cancel
                        </button>
                      </nav>
                    </form>
                  ) : (
                    <nav>
                      <h4>{ticket.title}</h4>
                      <p>{ticket.description}</p>
                      <p>Status: {ticket.status}</p>
                      <nav>
                        <li onClick={() => handleEdit(ticket)}>Edit</li>
                        <li onClick={() => handleDelete(ticket.id)}>Delete</li>
                      </nav>
                    </nav>
                  )}
                </div>
              ))
            )}
          </section>
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

export default TicketList;
