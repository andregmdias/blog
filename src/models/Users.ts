import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Posts from './Posts';

@Entity('Users')
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  displayName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  image: string;
}

export default User;
