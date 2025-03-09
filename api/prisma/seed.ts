import { PrismaClient } from '@prisma/client';
import { genSaltSync } from 'bcryptjs';
import { USERS } from './seed/users';
import { TASKS } from './seed/tasks';

async function main() {
    const prismaClient = new PrismaClient();
    await prismaClient.$connect();

    const salt = genSaltSync(10);

    await prismaClient.user.createMany({ data: USERS(salt) });
    await prismaClient.task.createMany({ data: TASKS });
}

main();
