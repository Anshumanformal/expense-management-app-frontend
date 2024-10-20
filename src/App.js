import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';


function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoutes>
        <HomePage />
      </ProtectedRoutes>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

// Checking if a user has signed in to access the homepage
// Here, props will be homepage
export function ProtectedRoutes(props) {
  if (localStorage.getItem("user"))
    return props.children
  else
    return <Navigate to="/login" />
}

export default App;
