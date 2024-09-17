import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { loginDTO } from './dto/loginDTO';
import { AuthService } from './auth.service';
import { ErrorMessage } from 'src/utils/errorMessage';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(
    @Body() loginDTO: loginDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(loginDTO);

    if (result instanceof ErrorMessage) {
      return res.status(400).json(result);
    }

    res.cookie('token', result.token, {
      secure: process.env.NODE_ENV === 'production', // Usar apenas em produção
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hora
      domain: 'localhost',
    });

    res.status(200).json({ message: 'Login successful' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
