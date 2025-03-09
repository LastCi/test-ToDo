import { USER_ROLE } from 'contracts';

export class ICreateUser {
    login: string;
    password: string;
    role: USER_ROLE;
}
