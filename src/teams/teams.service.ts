import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ITeamData } from './interface/teams.interface';
import { ITeamDTO } from './dto/teamDTO';
import { ErrorMessage } from 'src/utils/errorMessage';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<ITeamData[]> {
    try {
      return this.prisma.team.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findById(id: string): Promise<ITeamData | ErrorMessage> {
    try {
      const teamDB = await this.prisma.team.findFirst({
        where: {
          id,
        },
      });

      if (!teamDB) {
        return new ErrorMessage('Team not founded', 'TS28');
      }

      return teamDB;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async create(data: ITeamDTO): Promise<ITeamData> {
    try {
      return this.prisma.team.create({ data });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(data: ITeamDTO, id: string): Promise<ITeamData | ErrorMessage> {
    try {
      const teamDB = await this.prisma.team.findFirst({
        where: {
          id,
        },
      });

      if (!teamDB) {
        return new ErrorMessage('Team not founded', 'TS36');
      }

      const updatedTeam = this.prisma.team.update({
        where: {
          id,
        },
        data: {
          name: data.name || teamDB.name,
          description: data.description || teamDB.description,
        },
      });

      return updatedTeam;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: string): Promise<ITeamData | ErrorMessage> {
    try {
      const teamDB = await this.prisma.team.findFirst({
        where: {
          id,
        },
      });

      if (!teamDB) {
        return new ErrorMessage('Team not founded', 'TS36');
      }

      await this.prisma.team.delete({
        where: {
          id,
        },
      });

      return teamDB;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
