import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../models/user.entity';
import { RegisterDTO, LoginDTO } from '../auth/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(userDTO: RegisterDTO) {
    const { userName, password } = userDTO;
    try {
      const existUser: User | undefined = await User.findOne({
        userName,
      });
      if (existUser) {
        throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
      }
      console.log('userDTO: ', userDTO);
      const user: User = await User.create({
        userName,
        password,
      }).save();
      console.log('USER: ', user.userName);

      return {
        ok: true,
        user,
      };
    } catch (error) {
      return new HttpException(
        `Create user error: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByLogin(userDTO: LoginDTO) {
    const { userName, password } = userDTO;
    try {
      const user: User | undefined = await User.findOne({
        userName,
      });
      if (user) {
        const isValid = user.comparePassowrd(password);
        if (isValid) {
          return true;
        } else {
          return new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
        }
      } else {
        return new HttpException(
          'Not found username: ',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      return new HttpException('Login error: ', HttpStatus.BAD_REQUEST);
    }
  }
}
