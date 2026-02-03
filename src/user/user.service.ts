import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { createUserDto } from "./dto/create-user.dto";


@Injectable()

export class UserService{

  constructor (
    @InjectRepository(User) 
    private readonly usersRepo :  Repository<User>){}
  
  findAll(){
    return this.usersRepo.find();
  }

  async create(createUserDto : createUserDto){
    const {email , password, name } = createUserDto
    const userCheck = await this.usersRepo.findOneBy({email : email});
    if(userCheck){
      throw new ConflictException("already registered");
    }
    const user =  this.usersRepo.create({email, password, name});
    return this.usersRepo.save(user);
  }
}