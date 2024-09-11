import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { loginDTO } from './dto/loginDTO';
import { AuthService } from './auth.service';
import { ErrorMessage } from 'src/utils/errorMessage';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(
    @Body() loginDTO: loginDTO,
  ): Promise<{ token: string } | ErrorMessage> {
    return this.authService.login(loginDTO);
  }
}
