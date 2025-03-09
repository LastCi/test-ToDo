import { useState } from 'react';
import './TaskModal.css';
import { API_ROUTS } from '../../api/routs';
import { PRIORITY } from 'contracts/enums/task-priority.ts';
import { TASK_STATUS } from 'contracts/enums/task-status.ts';

export default function TaskModal({ task, onUpdate }) {
    const [formData, setFormData] = useState({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        endDate: task.endDate,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const updatedDate = new Date(formData.endDate);
            const response = await fetch(`${API_ROUTS.UPDATE_TASK}/${task.uuid}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ ...formData, endDate: updatedDate }),
            });

            if (response.ok) {
                const updatedTask = await response.json();
                onUpdate(updatedTask); 
            }
        } catch (error) {
            console.error('Ошибка при обновлении задачи:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Редактировать задачу</h2>
                <form onSubmit={handleSubmit}>
                    <label>Название:</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} />

                    <label>Описание:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} />

                    <label>Приоритет:</label>
                    <select name="priority" value={formData.priority} onChange={handleChange}>
                        <option value={PRIORITY.LOW}>Низкий</option>
                        <option value={PRIORITY.MEDIUM}>Средний</option>
                        <option value={PRIORITY.HIGH}>Высокий</option>
                    </select>

                    <label>Статус:</label>
                    <select name="status" value={formData.status} onChange={handleChange}>
                        <option value={TASK_STATUS.TO_BE_EXECUTED}>В ожидании</option>
                        <option value={TASK_STATUS.IN_PROGRESS}>В работе</option>
                        <option value={TASK_STATUS.EXECUTED}>Завершено</option>
                        <option value={TASK_STATUS.CANCELLED}>Отменено</option>
                    </select>

                    <label>Срок:</label>
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />

                    <button type="submit">Сохранить</button>
                    <button type="button" onClick={() => onUpdate(null)}>
                        Закрыть
                    </button>
                </form>
            </div>
        </div>
    );
}
