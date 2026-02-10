import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { createUserDto } from "./dto/create-user.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/auth/roles.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { UserRole } from "./user.entity";

@Controller('users')
export class UserController{
  constructor (private readonly usersService : UserService
  ){}

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  getUsers(){
    return this.usersService.findAll();
  }
  
  @Post()
  createUser(@Body() createUserDto : createUserDto){
    return this.usersService.create(createUserDto)
  }
}
