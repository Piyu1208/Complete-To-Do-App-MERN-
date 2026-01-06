import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await api.post("/user/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      navigate("/task");
    } catch (err) {

      if(err.response) {
        setError(err.response.data.message || "Invalid credentials");
      } else {
        setError("Something went wrong. Please try again. ");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="container mt-5"
      style={{ maxWidth: "400px" }}
    >
      <h2 className="mb-3">Login</h2>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <form onSubmit={submit}>
        <input 
          className="form-control mb-2"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input 
          className="form-control mb-3"
          placeholder="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button 
          className="btn btn-primary w-100 mb-3"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          className="btn btn-secondary w-100"
          onClick={(e) => navigate("/signup")}
        >
          Go to Signup page
        </button>
      </form>
    </div>

  );
}

export default Login;