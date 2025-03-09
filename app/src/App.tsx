import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/AuthPage';
import TasksPage from './pages/TasksPage';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

function App() {
    const [role, setRole] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode<{ role: string }>(token);
                setRole(decoded.role); // "MANAGER" или "SUBORDINATE"
            } catch (error) {
                console.error('Ошибка декодирования токена', error);
                localStorage.removeItem('token');
                setRole('');
            }
        }
    }, [token]);
    return (
        <Routes>
            <Route path="/" element={token ? <Navigate to="/tasks" /> : <AuthPage setRole={setRole} />} />
            <Route path="/tasks" element={token && role !== '' ? <TasksPage role={role} /> : <Navigate to="/" />} />
        </Routes>
    );
}

export default App;
