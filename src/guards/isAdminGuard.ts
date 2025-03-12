import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    if (!req.user || req.user.role !== "admin") {
      throw new ForbiddenException({
        message: "Sizda adminlik huquqi yo'q",
      });
    }

    return true;
  }
}
