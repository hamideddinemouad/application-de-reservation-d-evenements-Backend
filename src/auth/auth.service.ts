import { Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { LoginDto } from "./dto/login.dto";
import bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService
  ) {
  }
  async login(LoginDto: LoginDto) {
    const { email, password } = LoginDto;
    const user = await this.userService.findByEmail(email);
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new NotFoundException("email or password are incorrect");
    }

    const payload = {
      email: user.email,
      id: user.id,
      role: user.role,
    }

    const accessToken =  await this.jwtService.signAsync(payload);
    return {
      access_token: accessToken,
    }
  }
}