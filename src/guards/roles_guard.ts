// import {
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
//   Injectable,
//   UnauthorizedException,
// } from "@nestjs/common";
// import { Reflector } from "@nestjs/core";
// import { JwtService } from "@nestjs/jwt";
// import { AnyTxtRecord } from "dns";
// import { Observable } from "rxjs";
// import { ROLES_KEY } from "../dekorators/roles_auth_dekorator";

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(
//     private readonly jwtService: JwtService,
//     private readonly reflector: Reflector
//   ) {}
//   canActivate(
//     context: ExecutionContext
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const requiredRoles = this.reflector.getAllAndOverride<string[]>(
//       ROLES_KEY,
//       [context.getHandler(), context.getClass()]
//     );
//     if (!requiredRoles) {
//       return true;
//     }
//     const req = context.switchToHttp().getRequest();
//     const authHeader = req.headers.authorization;
//     console.log(authHeader);
    
//     if (!authHeader) {
//       throw new UnauthorizedException({
//         message: "token berilmagan",
//       });
//     }
//     const bearer = authHeader.split(" ")[0];
//     const token = authHeader.split(" ")[1];
//     if (bearer !== "Bearer" || !token) {
//       throw new UnauthorizedException({
//         message: "Bearer token berilmagan",
//       });
//     }

//     let user: any;
//     try {
//       user = this.jwtService.verify(token);
//     } catch {
//       throw new UnauthorizedException({ message: "Token verification failed" });
//     }
//     req.user = user;

//     const permission = user.roles.some((role: any) => {
//       return requiredRoles.includes(role.value);
//     });
//     if (!permission) {
//       throw new ForbiddenException({
//         message: "Sizga ruxsat etilmagan",
//       });
//     }

//     return true;
//   }
// }
