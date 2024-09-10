import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ITaskData } from './interface/tasks.interface';
import { ErrorMessage } from 'src/utils/errorMessage';
import { TaskDTO } from './dto/taskDTO';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  findAll(): Promise<ITaskData[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<ITaskData | ErrorMessage> {
    return this.taskService.findById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() teamDTO: TaskDTO): Promise<ITaskData> {
    return this.taskService.create(teamDTO);
  }

  @Put(':id')
  update(
    @Body() teamDTO: TaskDTO,
    @Param('id') id: string,
  ): Promise<ITaskData | ErrorMessage> {
    return this.taskService.update(teamDTO, id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<ITaskData | ErrorMessage> {
    return this.taskService.delete(id);
  }
}
