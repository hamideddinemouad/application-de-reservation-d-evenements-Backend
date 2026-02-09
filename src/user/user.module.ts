import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserController} from "./user.controller";
import { UserService } from "./user.service";
import { AuthGuard } from "src/auth/auth.guard";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports : [TypeOrmModule.forFeature([User])],
  controllers : [UserController],
  providers : [UserService, JwtService],
  exports : [UserService,]
})

export class UsersModule {}