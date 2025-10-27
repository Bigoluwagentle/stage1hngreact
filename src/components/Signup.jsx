import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sign = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!email || !username || !password) {
      setError("All fields are required");
      return;
    }

    const userData = { email, username, password };
    localStorage.setItem("ticketapp_user", JSON.stringify(userData));
    localStorage.setItem("ticketapp_session", "active");

    alert("Signup successful!");
    navigate("/dashboard");
  };

  return (
    <div id="login">
      <h1>Ticketly</h1>
      <p>Signup Now!</p>
      <form onSubmit={handleSignup}>
        <nav>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!email && error && <p>Field is required</p>}
        </nav>
        <nav>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {!username && error && <p>Field is required</p>}
        </nav>
        <nav>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!password && error && <p>Field is required</p>}
        </nav>
        <nav>
          <button>Signup</button>
        </nav>
        <nav>
          <p>
            Already have an account <b onClick={() => navigate("/login")}>Login</b>
          </p>
        </nav>
      </form>
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

export default Sign;
