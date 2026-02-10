import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { createUserDto } from "./dto/create-user.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('users')
export class UserController{
  constructor (private readonly usersService : UserService
  ){}

  @Get()
  @UseGuards(AuthGuard)
  getUsers(){
    return this.usersService.findAll();
  }
  
  @Post()
  createUser(@Body() createUserDto : createUserDto){
    return this.usersService.create(createUserDto)
  }
}