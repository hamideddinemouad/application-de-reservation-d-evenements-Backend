import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserController} from "./user.controller";
import { UserService } from "./user.service";
import { AuthGuard } from "src/auth/auth.guard";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthModule } from "src/auth/auth.module";


@Module({
  imports : [TypeOrmModule.forFeature([User])],
  controllers : [UserController],
  providers : [UserService, AuthGuard],
  exports : [UserService,]
})

export class UsersModule {}