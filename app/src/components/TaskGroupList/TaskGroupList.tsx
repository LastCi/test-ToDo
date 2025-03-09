import { useEffect, useState } from 'react';
import { Task } from '../Task/Task';
import TaskModal from '../TaskModal/TaskModal';
import './TaskGroupList.css';

export function TaskGroupList({ group, index }) {
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasks, setTasks] = useState(group.tasks);

    useEffect(() => {
        setTasks(group.tasks);
    }, [group.tasks]);

    const handleEditTask = (task) => {
        setSelectedTask(task);
    };

    const handleUpdateTask = (updatedTask) => {
        if (updatedTask === null) {
            setSelectedTask(null);
        } else {
            setTasks((prevTasks) =>
                prevTasks.map((t) => (t.uuid === updatedTask.uuid ? { Responsible: t.Responsible, ...updatedTask } : t)),
            );
            setSelectedTask(null);
        }
    };

    return (
        <div className="task-group" key={index}>
            <h2>{group.group || 'Все'}</h2>
            <div className="task-group__container">
                {tasks
                    .sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime())
                    .map((task) => (
                        <Task task={task} onEdit={handleEditTask}></Task>
                    ))}
            </div>
            {selectedTask && <TaskModal task={selectedTask} onUpdate={handleUpdateTask} />}
        </div>
    );
}
