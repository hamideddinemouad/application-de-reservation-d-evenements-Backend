import { Body, Controller, Post, Get, UseGuards, HttpCode, Res, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthGuard } from "./auth.guard";
import { JwtService } from "@nestjs/jwt";
import { PassThrough } from "stream";
import type { Response } from "express";
import type { Request } from "express";

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService,
  ) {
  }
  @Post('login')
  @HttpCode(200)
  async login(@Body()  body: LoginDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.auth.login(body);
    res.cookie("access_token", result.access_token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, 
    });
    return result.access_token
  }
  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Req() req) {
    return req.user;
  }
}