import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { Event } from "./event.entity";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventController],
  providers: [EventService, AuthGuard, RolesGuard],
  exports: [EventService],
})
export class EventModule {}
