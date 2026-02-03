import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

enum UserRole {
  user = "user",
  admin = "admin"
}

@Entity('users')
@Unique(['email'])

export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.user,
  })
  role: UserRole
  
}