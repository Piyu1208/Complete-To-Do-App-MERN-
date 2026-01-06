export const getToken = () => localStorage.getItem('token');

export const isAuthenticated = () => !!getToken();

export const getUserRole = () => {
  return localStorage.getItem("role");
};

export const isAdmin = () => 
  localStorage.getItem('role') === 'admin';

export const logout = () => {
  localStorage.clear();
}