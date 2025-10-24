import "./Dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Mobile from "./mobile";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [ticketStats, setTicketStats] = useState({
    total: 0,
    open: 0,
    resolved: 0,
  });

  useEffect(() => {
    const session = localStorage.getItem("ticketapp_session");
    const storedUser = JSON.parse(localStorage.getItem("ticketapp_user"));

    if (!session || !storedUser) {
      navigate("/login");
      return;
    }

    setUser(storedUser);

    const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const openTickets = storedTickets.filter((t) => t.status === "open").length;
    const resolvedTickets = storedTickets.filter(
      (t) => t.status === "closed"
    ).length;

    setTicketStats({
      total: storedTickets.length,
      open: openTickets,
      resolved: resolvedTickets,
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session");
    alert("You have been logged out.");
    navigate("/login");
  };

  return (
    <div id="dashboard">
        <Mobile/>
      <div id="container">
        <aside>
          <h1>Ticketly</h1>
          <div>
            <nav>
              <h4 onClick={() => navigate("/dashboard")}>Dashboard</h4>
              <h4 onClick={() => navigate("/ticket")}>Create Ticket</h4>
              <h4 onClick={() => navigate("/ticketList")}>Tickets Lists</h4>
            </nav>
            <h4 onClick={handleLogout}>Logout</h4>
          </div>
        </aside>

        <main>
          <div>
            <h1>DASHBOARD</h1>
            <h2>Welcome, {user?.username || "User"}</h2>
          </div>

          <section>
            <article>
              <i className="fa-solid fa-square-plus"></i>
              <h4>Total Tickets</h4>
              <p>{ticketStats.total}</p>
            </article>

            <article>
              <i className="fa-solid fa-square-plus"></i>
              <h4>Open Tickets</h4>
              <p>{ticketStats.open}</p>
            </article>

            <article>
              <i className="fa-solid fa-square-plus"></i>
              <h4>Resolved Tickets</h4>
              <p>{ticketStats.resolved}</p>
            </article>

            <article onClick={() => navigate("/ticket")}>
              Go to Ticket Management
            </article>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
