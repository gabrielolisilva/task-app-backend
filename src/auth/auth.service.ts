import { Injectable } from '@nestjs/common';
import { loginDTO } from './dto/loginDTO';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ErrorMessage } from 'src/utils/errorMessage';
import { IUsersData } from 'src/users/interface/users.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDTO: loginDTO): Promise<{ token: string } | ErrorMessage> {
    const userDB = await this.userService.findByEmail(loginDTO.email);

    if (!userDB) {
      return new ErrorMessage('User not founded', 'AC18');
    }

    const validationResult = await this.validateUser(
      loginDTO.email,
      loginDTO.password,
    );

    if (validationResult instanceof ErrorMessage) {
      return validationResult;
    }

    const token = this.jwtService.sign(
      {
        id: userDB.id,
        name: userDB.name,
        email: userDB.email,
        teamId: userDB.team_id,
      },
      { secret: process.env.JWT_SECRET, expiresIn: '60m' },
    );

    return { token };
  }

  private async validateUser(
    email: string,
    password: string,
  ): Promise<IUsersData | ErrorMessage> {
    const userDB = await this.userService.findByEmail(email);

    if (!userDB) {
      return new ErrorMessage('User not founded', 'AC40');
    }

    const comparePassword = await bcrypt.compare(password, userDB.password);

    if (!comparePassword) {
      return new ErrorMessage('Invalid password', 'AC47');
    }

    return userDB;
  }
}
