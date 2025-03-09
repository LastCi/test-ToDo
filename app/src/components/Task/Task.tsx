import { useEffect } from 'react';
import './Task.css';

export const Task = ({ task, onEdit }) => {
    console.log(task);
    useEffect(() => {
        console.log('Task updated:', task);
    }, [task]);
    const taskNameStyle = 'task__value ' + (new Date(task.endDate).getTime() < new Date().getTime() ? 'overdue' : '');
    return (
        <div className="task" data-priority={task.priority} data-status={task.status} onClick={() => onEdit(task)}>
            <div className="task__field">
                <span className="task__label">Название: </span>
                <span className={taskNameStyle}>{task.title}</span>
            </div>
            <div className="task__field">
                <span className="task__label">Описание: </span>
                <span className="task__value">{task.description}</span>
            </div>
            <div className="task__field">
                <span className="task__label">Приоритет: </span>
                <span className="task__value">{task.priority}</span>
            </div>
            <div className="task__field">
                <span className="task__label">Статус: </span>
                <span className="task__value">{task.status}</span>
            </div>
            <div className="task__field">
                <span className="task__label">Ответственный: </span>
                <span className="task__value">{task.Responsible.name}</span>
            </div>
            <div className="task__field">
                <span className="task__label">Создано: </span>
                <span className="task__value">{new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="task__field">
                <span className="task__label">Обновлено: </span>
                <span className="task__value">{new Date(task.updatedAt).toLocaleDateString()}</span>
            </div>
            <div className="task__field">
                <span className="task__label">Дедлайн: </span>
                <span className="task__value">{new Date(task.endDate).toLocaleDateString()}</span>
            </div>
        </div>
    );
};
