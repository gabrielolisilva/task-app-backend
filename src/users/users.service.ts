import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { IUsersData } from './interface/users.interface';
import { ErrorMessage } from 'src/utils/errorMessage';
import { IUserDTO } from './dto/userDTO';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<IUsersData[]> {
    try {
      return this.prisma.user.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findById(id: string): Promise<IUsersData | ErrorMessage> {
    try {
      const userDB = await this.prisma.user.findFirst({
        where: {
          id,
        },
        include: {
          Task: true,
        },
      });

      if (!userDB) {
        return new ErrorMessage('User not founded', 'US28');
      }

      return userDB;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async create(data: IUserDTO): Promise<IUsersData> {
    try {
      return this.prisma.user.create({ data });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(data: IUserDTO, id: string): Promise<IUsersData | ErrorMessage> {
    try {
      const userDB = await this.prisma.user.findFirst({
        where: {
          id,
        },
      });

      if (!userDB) {
        return new ErrorMessage('User not founded', 'US36');
      }

      const updatedUser = this.prisma.user.update({
        where: {
          id,
        },
        data: {
          name: data.name || userDB.name,
          lastName: data.lastName || userDB.lastName,
          email: data.email || userDB.email,
          password: data.password || userDB.password,
          team_id: data.team_id || userDB.team_id,
        },
      });

      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: string): Promise<IUsersData | ErrorMessage> {
    try {
      const userDB = await this.prisma.user.findFirst({
        where: {
          id,
        },
      });

      if (!userDB) {
        return new ErrorMessage('user not founded', 'US36');
      }

      await this.prisma.user.delete({
        where: {
          id,
        },
      });

      return userDB;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
