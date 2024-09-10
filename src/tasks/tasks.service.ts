import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ITaskData } from './interface/tasks.interface';
import { ErrorMessage } from 'src/utils/errorMessage';
import { TaskDTO } from './dto/taskDTO';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<ITaskData[]> {
    try {
      return this.prisma.task.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findById(id: string): Promise<ITaskData | ErrorMessage> {
    try {
      const taskDB = await this.prisma.task.findFirst({
        where: {
          id,
        },
      });

      if (!taskDB) {
        return new ErrorMessage('Task not founded', 'TS28');
      }

      return taskDB;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async create(data: TaskDTO): Promise<ITaskData> {
    try {
      const formatedDate = new Date(data.expiration_date);
      data.expiration_date = formatedDate;

      return this.prisma.task.create({ data });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(data: TaskDTO, id: string): Promise<ITaskData | ErrorMessage> {
    try {
      const taskDB = await this.prisma.task.findFirst({
        where: {
          id,
        },
      });

      if (!taskDB) {
        return new ErrorMessage('Task not founded', 'TS36');
      }

      const updatedTask = this.prisma.task.update({
        where: {
          id,
        },
        data: {
          title: data.title || taskDB.title,
          description: data.description || taskDB.description,
          expiration_date: data.expiration_date || taskDB.expiration_date,
          owner_id: data.owner_id || taskDB.owner_id,
          project_id: data.project_id || taskDB.project_id,
        },
      });

      return updatedTask;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: string): Promise<ITaskData | ErrorMessage> {
    try {
      const taskDB = await this.prisma.task.findFirst({
        where: {
          id,
        },
      });

      if (!taskDB) {
        return new ErrorMessage('Task not founded', 'TS36');
      }

      await this.prisma.task.delete({
        where: {
          id,
        },
      });

      return taskDB;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
