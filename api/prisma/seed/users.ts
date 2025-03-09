import { compareSync, hashSync } from 'bcryptjs';
import { USER_ROLE } from 'contracts';
import { randomUUID } from 'crypto';

export const USERS = (salt: string) => [
    // Первый руководитель
    {
        uuid: '3bb2cbbf-6d10-46bf-b5c3-69a2c19f3fc3',
        login: 'Alex',
        password: hashSync('password123', salt),
        supervisorId: null,
        name: 'Алексей',
        surname: 'Иванов',
        patronymic: 'Сергеевич',
        role: 'MANAGER',
        createdAt: new Date(2025, 3, 1),
        updatedAt: new Date(2025, 3, 1),
    },

    // Второй руководитель
    {
        uuid: '6fd7a2b3-5e8d-43d6-9e57-1b93e64f67c5',
        login: 'Maria',
        password: hashSync('password456', salt),
        supervisorId: null,
        name: 'Мария',
        surname: 'Петрова',
        patronymic: 'Александровна',
        role: 'MANAGER',
        createdAt: new Date(2025, 3, 1),
        updatedAt: new Date(2025, 3, 1),
    },

    // Подчинённые первого руководителя (Alex)
    {
        uuid: '8cfd91f5-98db-4a52-b59f-8a934c456cde',
        login: 'Ivan',
        password: hashSync('password789', salt),
        supervisorId: '3bb2cbbf-6d10-46bf-b5c3-69a2c19f3fc3',
        name: 'Иван',
        surname: 'Сидоров',
        patronymic: 'Николаевич',
        role: 'SUBORDINATE',
        createdAt: new Date(2025, 3, 1),
        updatedAt: new Date(2025, 3, 1),
    },
    {
        uuid: '11fedeac-3d9c-487e-85f3-64952732c28a',
        login: 'Dmitry',
        password: hashSync('password321', salt),
        supervisorId: '3bb2cbbf-6d10-46bf-b5c3-69a2c19f3fc3',
        name: 'Дмитрий',
        surname: 'Орлов',
        patronymic: 'Геннадьевич',
        role: 'SUBORDINATE',
        createdAt: new Date(2025, 3, 1),
        updatedAt: new Date(2025, 3, 1),
    },

    // Подчинённые второго руководителя (Maria)
    {
        uuid: '74ae2b5f-0c9a-4694-bd5c-827e70a76e1e',
        login: 'Elena',
        password: hashSync('password654', salt),
        supervisorId: '6fd7a2b3-5e8d-43d6-9e57-1b93e64f67c5',
        name: 'Елена',
        surname: 'Васильева',
        patronymic: 'Дмитриевна',
        role: 'SUBORDINATE',
        createdAt: new Date(2025, 3, 1),
        updatedAt: new Date(2025, 3, 1),
    },
    {
        uuid: 'b2dbfbbf-2576-4896-bd1a-3376ff7d2cd7',
        login: 'Sergey',
        password: hashSync('password987', salt),
        supervisorId: '6fd7a2b3-5e8d-43d6-9e57-1b93e64f67c5',
        name: 'Сергей',
        surname: 'Кузнецов',
        patronymic: 'Павлович',
        role: 'SUBORDINATE',
        createdAt: new Date(2025, 3, 1),
        updatedAt: new Date(2025, 3, 1),
    },
];
