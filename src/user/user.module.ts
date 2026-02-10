import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserController} from "./user.controller";
import { UserService } from "./user.service";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/auth/roles.guard";


@Module({
  imports : [TypeOrmModule.forFeature([User])],
  controllers : [UserController],
  providers : [UserService, AuthGuard, RolesGuard],
  exports : [UserService,]
})

export class UsersModule {}
