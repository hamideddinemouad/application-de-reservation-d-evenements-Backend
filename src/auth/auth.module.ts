import { Module } from "@nestjs/common";
import { UsersModule } from "src/user/user.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtModule],
  imports: [UsersModule, JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      secret: config.get('JWT_ACCESS'),
      global: true,
      signOptions: { expiresIn: config.get('JWT_ACCESS_EXPIRES_IN') },
    })
  })]
})

export class AuthModule { }