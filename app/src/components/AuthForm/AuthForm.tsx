import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';
import { API_ROUTS } from '../../api/routs';
import { jwtDecode } from 'jwt-decode';

export function AuthForm({ setRole }) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(API_ROUTS.LOGIN, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Ошибка входа');

            localStorage.setItem('token', data.accessToken);
            const role = jwtDecode(data.accessToken);
            setRole(role);
            navigate('/tasks');
        } catch (err) {
            if (err instanceof Error) {
                setError(err?.message);
            } else {
                setError('Ошибка входа');
            }
        }
    };
    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2 className="auth-form__header">Вход</h2>
            {error && <p className="text-red-500">{error}</p>}
            <input type="text" placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)} className="input" />
            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
            />
            <button type="submit" className="auth_submit__button">
                Войти
            </button>
        </form>
    );
}
