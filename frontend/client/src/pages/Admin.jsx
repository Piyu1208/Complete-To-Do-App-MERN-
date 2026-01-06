import { useEffect, useState } from "react";
import api from "../api/axios";

function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/user");
      setUsers(res.data);
    } catch(err) {
      console.log(err.response?.data);
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/user/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Admin Panel</h1>

      <table className="table table-bordered table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th style={{ width: "120px" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button 
                  className="btn btn-danger btn-sm"
                  disabled={user.role === "admin"}
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;