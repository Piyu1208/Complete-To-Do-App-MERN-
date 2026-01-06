import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateSignup = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.trim()) return "Email is required";

    const emailRegex = /^\S+@\S+\.\S+$/;
    if(!emailRegex.test(form.email))
      return "Invalid email format";

    if (!form.password) return "Password is required";
    if (form.password.length < 6)
      return "Password must be at least 6 characters";

    if (form.password !== form.confirmPassword)
      return "Passwords do not match";

    return null;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateSignup();
    if(validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      await api.post("/user/signup", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="container mt-5"
      style={{maxWidth: "400px"}}
    >
      <h2 className="mb-3">Signup</h2>

      {error && (
        <div className="alert alert-danger text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input 
          className="form-control mb-2"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input 
          className="form-control mb-2"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input 
          className="form-control mb-3"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />


        <button
          className="btn btn-primary w-100 mb-2"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <button 
          className="btn btn-secondary w-100"
          onClick={(e) => navigate("/login")}
        >
          Go to Login page
        </button>
      </form>
    </div>
  );
}


export default Signup;