import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../utils/auth";


function AdminRoute({ children }) {
  if(!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }


  if(getUserRole() != "admin") {
    return <Navigate to="/task" replace />;
  }

  return children;
}

export default AdminRoute;