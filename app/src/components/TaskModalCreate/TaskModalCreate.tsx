import { useState } from 'react';
import './TaskModalCreate.css';
import { API_ROUTS } from '../../api/routs';
import { PRIORITY } from 'contracts/enums/task-priority.ts';
import { TASK_STATUS } from 'contracts/enums/task-status.ts';

export default function TaskModalCreate({ onCreate, responsible }) {
    const [formData, setFormData] = useState({
        title: 'Новая задача',
        description: 'Описание',
        priority: PRIORITY.HIGH,
        status: TASK_STATUS.TO_BE_EXECUTED,
        responsibleId: responsible[0].uuid,
        endDate: new Date(),
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const updatedDate = formData?.endDate ? new Date(formData.endDate) : new Date();
            console.log(JSON.stringify({ ...formData, endDate: updatedDate }));
            const response = await fetch(`${API_ROUTS.CREATE_TASK}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    ...formData,
                    endDate: updatedDate,
                }),
            });

            if (response.ok) {
                const createdTask = await response.json();
                console.log('new Task', createdTask);
                onCreate({
                    ...createdTask,
                    Responsible: { name: responsible.find((obj) => obj.uuid === formData.responsibleId).name },
                });
            }
        } catch (error) {
            console.error('Ошибка при создании задачи:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Создать задачу</h2>
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
                    <label>Ответственный:</label>
                    <select name="responsibleId" value={formData.responsibleId} onChange={handleChange}>
                        {responsible.map((r) => (
                            <option key={r.uuid} value={r.uuid}>
                                {r.name}
                            </option>
                        ))}
                    </select>

                    <label>Срок:</label>
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />

                    <button type="submit">Сохранить</button>
                    <button type="button" onClick={() => onCreate(null)}>
                        Закрыть
                    </button>
                </form>
            </div>
        </div>
    );
}
