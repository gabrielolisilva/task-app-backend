import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { IProjectData } from './interface/projects.interface';
import { ErrorMessage } from 'src/utils/errorMessage';
import { ProjectDTO } from './dto/projectDTO';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<IProjectData[]> {
    try {
      return await this.prisma.project.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findById(id: string): Promise<IProjectData | ErrorMessage> {
    try {
      const projectDB = await this.prisma.project.findFirst({
        where: {
          id,
        },
        include: {
          Task: true,
        },
      });

      if (!projectDB) {
        return new ErrorMessage('Project not founded', 'PS28');
      }

      return projectDB;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async create(data: ProjectDTO): Promise<IProjectData> {
    try {
      return this.prisma.project.create({ data });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(
    data: ProjectDTO,
    id: string,
  ): Promise<IProjectData | ErrorMessage> {
    try {
      const projectDB = await this.prisma.project.findFirst({
        where: {
          id,
        },
      });

      if (!projectDB) {
        return new ErrorMessage('Project not founded', 'PS36');
      }

      const updatedProject = this.prisma.project.update({
        where: {
          id,
        },
        data: {
          name: data.name || projectDB.name,
          description: data.description || projectDB.description,
          team_id: data.team_id || projectDB.team_id,
        },
      });

      return updatedProject;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: string): Promise<IProjectData | ErrorMessage> {
    try {
      const projectDB = await this.prisma.project.findFirst({
        where: {
          id,
        },
      });

      if (!projectDB) {
        return new ErrorMessage('Project not founded', 'PS36');
      }

      await this.prisma.project.delete({
        where: {
          id,
        },
      });

      return projectDB;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
