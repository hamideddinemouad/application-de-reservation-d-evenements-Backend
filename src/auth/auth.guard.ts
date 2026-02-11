import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
    }
    async canActivate(context: ExecutionContext, ) {
         
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request)
         || request.cookies?.access_token;
        if(!token){
            console.log(request.cookies)
            throw new UnauthorizedException("missing token")
        }
        try {
            const payload = await this.jwtService.verifyAsync(token);
            request['user'] = payload;
        } catch (error) {
            throw new UnauthorizedException("invalid token")
        }
        return true
    }
    extractTokenFromHeader(request : Request) : string | undefined{
        const [type, token] = request.headers.authorization?.split(' ')  ?? [];
        return type === 'Bearer' ? token : undefined;
    }

}