// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./mobile.css";

const Mobile = () => {
    const navigate = useNavigate();
    function menu(){
        document.querySelector("#mobile > section").style.display = "block"
    }
    function close(){
        document.querySelector("#mobile > section").style.display = "none"
    }
    const handleLogout = () => {
        localStorage.removeItem("ticketapp_session");
        alert("You have been logged out.");
        navigate("/login");
    };
    return(
        <div id="mobile">
            <i className="fa-solid fa-bars" onClick={menu}></i>
            <section>
                <aside>
                    <div>
                        <nav>
                            <i className="fa-solid fa-xmark" onClick={close}></i>
                            <h4 onClick={() => navigate("/dashboard")}>Dashboard</h4>
                            <h4 onClick={() => navigate("/ticket")}>Create Ticket</h4>
                            <h4 onClick={() => navigate("/ticketList")}>Tickets Lists</h4>
                            </nav>
                        <h4 onClick={handleLogout}>Logout</h4>
                    </div>
                </aside>
            </section>
        </div>
    )
}
export default Mobile;