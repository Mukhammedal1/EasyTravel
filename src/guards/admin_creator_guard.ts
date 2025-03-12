import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";

@Injectable()
export class AdminCreatorGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    if (req.user.role !== "admin" || !req.user.is_creator) {
      throw new ForbiddenException({
        message: "Sizda bunday huquq yo'q",
      });
    }

    return true;
  }
}
