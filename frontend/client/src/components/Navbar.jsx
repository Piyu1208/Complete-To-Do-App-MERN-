import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-light bg-light px-3">
      <span
        className="navbar-brand"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/task")}
      >
        Task App
      </span>

      {isLoggedIn && (
        <button
          className="btn btn outline-danger"
          onClick={logout}
        >
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;