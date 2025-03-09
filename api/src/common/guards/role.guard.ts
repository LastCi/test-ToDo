import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
    private currentRoles: string[];
    constructor(currentRoles: string[]) {
        this.currentRoles = currentRoles;
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const role = request.user?.role;
        if (!role) {
            return false;
        }
        return this.currentRoles.includes(role);
    }
}
