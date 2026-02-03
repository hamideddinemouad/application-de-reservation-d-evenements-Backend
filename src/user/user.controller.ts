import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { createUserDto } from "./dto/create-user.dto";

@Controller('users')
export class UserController{
  constructor (private readonly usersService : UserService){}

  @Get()
  getUsers(){
    return this.usersService.findAll();
  }

  @Post()
  createUser(@Body() createUserDto : createUserDto){
    return this.usersService.create(createUserDto)
  }
}