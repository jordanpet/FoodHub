import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { request } from "http";


@Injectable()
export class AuthenticationGuard implements CanActivate {
    canActivate(
        context: ExecutionContext
    ):boolean {
        const request = context.switchToHttp().getRequest();
        return request.currentUser
    }
}

