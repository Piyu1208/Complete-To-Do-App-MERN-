import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Task from "./pages/Task";
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from "./components/Navbar";
import AdminRoute from "./components/AdminRoute";


function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Navbar />

      <Routes> 
        <Route 
          path="/"
          element={
            isLoggedIn ? <Navigate to="/task" /> : <Navigate to="/signup" />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          } 
        />
        <Route path="/task" element={
          <ProtectedRoute>
            <Task />
          </ProtectedRoute>
          } />
      </Routes>
    </BrowserRouter>
  );
}


export default App;