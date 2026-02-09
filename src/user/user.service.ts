import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { createUserDto } from "./dto/create-user.dto";
import bcrypt from "bcrypt"
import { hash } from "crypto";

@Injectable()

export class UserService{

  constructor (
    @InjectRepository(User) 
    private readonly usersRepo :  Repository<User>){}
  
  findAll(){
    return this.usersRepo.find();
  }
  async isRegistered(email : string){
    const registered = await this.usersRepo.findOneBy({email : email});
    if(registered){
      return true
    }
    return false
  }
  async findByEmail(email : string) : Promise<User | null> {
    const user = await this.usersRepo.findOneBy({email : email});
    return user;
  }
  async create(createUserDto : createUserDto){
    const {email , password, name } = createUserDto
    const registered = await this.isRegistered(email);
    if(registered){
      throw new ConflictException("already registered");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepo.create({email, password : hashedPassword, name});
    return this.usersRepo.save(user);
  }
}