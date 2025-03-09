import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ROUTS } from '../api/routs';
import { USER_ROLE } from 'contracts/enums/user-role.ts';
import { GROUP_TASK } from '../common/enums/task-group';
import { TaskGroupList } from '../components/TaskGroupList/TaskGroupList';
import TaskModalCreate from '../components/TaskModalCreate/TaskModalCreate';
import { TaskExtended } from 'contracts/task/task.schema.ts';

const TasksPage = ({ role }) => {
    const token = localStorage.getItem('token');
    const [tasks, setTasks] = useState<TaskExtended[]>([]);
    const [grouping, setGrouping] = useState(GROUP_TASK.NONE);
    const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для управления модалкой

    function handleCreateTask(task: TaskExtended | null) {
        if (task) {
            setTasks((prevTasks) => [...prevTasks, task]);
            setIsModalOpen(false);
        }
        setIsModalOpen(false);
    }

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const url = role == USER_ROLE.MANAGER ? API_ROUTS.MANAGER_TASKS : API_ROUTS.USER_TASKS;
                const response = await axios.get(url, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTasks(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке задач:', error);
            }
        };

        fetchTasks();
    }, []);

    // Функция для группировки задач
    const groupTasks = (tasks) => {
        if (grouping === GROUP_TASK.NONE) {
            return [{ group: 'Все', tasks: tasks }];
        }

        if (grouping === GROUP_TASK.DATE) {
            const today = new Date();
            const weekLater = new Date();
            weekLater.setDate(today.getDate() + 7);

            const todayTasks = tasks.filter((task) => new Date(task.endDate).toDateString() === today.toDateString());
            const weekTasks = tasks.filter((task) => new Date(task.endDate) <= weekLater);
            const futureTasks = tasks.filter((task) => new Date(task.endDate) > weekLater);

            return [
                { group: 'Сегодня', tasks: todayTasks },
                { group: 'На неделю', tasks: weekTasks },
                { group: 'Будущее', tasks: futureTasks },
            ];
        }

        if (grouping === GROUP_TASK.RESPONSIBLE) {
            const groupedByResponsible = tasks.reduce((groups, task) => {
                const responsibleId = task.Responsible.name || 'Без ответственного';
                if (!groups[responsibleId]) {
                    groups[responsibleId] = [];
                }
                groups[responsibleId].push(task);
                return groups;
            }, {});

            return Object.entries(groupedByResponsible).map(([responsible, tasks]) => ({
                group: responsible,
                tasks,
            }));
        }

        return tasks;
    };
    const groupedTasks = groupTasks(tasks);

    function getResponsible() {
        const responsibleUuids = Array.from(new Set(tasks.map((t) => t.Responsible.uuid)));
        return responsibleUuids.map((uuid) => {
            return {
                uuid,
                name: tasks.find((t) => t.responsibleId === uuid)?.Responsible.name,
            };
        });
    }

    return (
        <div className="task_container">
            <h1>Список задач</h1>
            <div className="task_page__buttons_container">
                {/* Кнопка для добавления новой задачи */}
                <button className="task_page__button" onClick={() => setIsModalOpen(true)}>
                    Новая задача
                </button>
                <button className="task_page__button" onClick={() => setGrouping(GROUP_TASK.NONE)}>
                    Все задачи
                </button>
                {role === USER_ROLE.MANAGER ? (
                    <button className="task_page__button" onClick={() => setGrouping(GROUP_TASK.RESPONSIBLE)}>
                        По ответственным
                    </button>
                ) : (
                    ''
                )}
                <button className="task_page__button" onClick={() => setGrouping(GROUP_TASK.DATE)}>
                    По дате
                </button>
            </div>
            {groupedTasks.map((group, index) => (
                <div key={index}>
                    <TaskGroupList group={group} index={index}></TaskGroupList>
                </div>
            ))}
            {isModalOpen && (
                <TaskModalCreate
                    onCreate={handleCreateTask} // Функция для обновления списка задач
                    responsible={getResponsible()} // Здесь можно передать список ответственных, если нужно
                />
            )}
        </div>
    );
};

export default TasksPage;
