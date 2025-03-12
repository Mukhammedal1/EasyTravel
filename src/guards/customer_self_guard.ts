import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";

@Injectable()
export class CustomerSelfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    if (req.user.role === "admin") {
      return true;
    }
    if (req.user.role === "customer" && req.user.id == req.params.id) {
      return true;
    }
    throw new ForbiddenException({
      message: "Ruxsat etilmagan foydalanuvchi",
    });
  }
}
