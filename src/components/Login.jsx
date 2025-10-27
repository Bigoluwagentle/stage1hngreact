import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("ticketapp_user"));

    if (!storedUser) {
      setError("No account found. Please signup first.");
      return;
    }

    if (storedUser.email === email && storedUser.password === password) {
      localStorage.setItem("ticketapp_session", "active"); // mock session
      alert("Login successful!");
      navigate("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div id="login">
      <h1>Ticketly</h1>
      <p>Welcome Back!</p>
      <form onSubmit={handleLogin}>
        <nav>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
        </nav>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <nav>
          <button>Login</button>
        </nav>
        <nav>
          <p>
            Doesn't have an account{" "}
            <b onClick={() => navigate("/signup")}>Signup</b>
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

export default Login;
