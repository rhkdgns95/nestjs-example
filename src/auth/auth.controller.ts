import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { RegisterDTO, LoginDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('login')
  async login(@Body() userDTO: RegisterDTO) {
    return await this.userService.findByLogin(userDTO);
  }

  @Post('register')
  async register(@Body() userDTO: LoginDTO) {
    console.log('My userDTO: ', userDTO);
    return await this.userService.create(userDTO);
  }
}
