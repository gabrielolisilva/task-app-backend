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
import { ProjectsService } from './projects.service';
import { IProjectData } from './interface/projects.interface';
import { ErrorMessage } from 'src/utils/errorMessage';
import { ProjectDTO } from './dto/projectDTO';

@Controller('projects')
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @Get()
  findAll(): Promise<IProjectData[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<IProjectData | ErrorMessage> {
    return this.projectService.findById(id);
  }

  @Get('team/:teamId')
  findByTeams(@Param('teamId') teamId: string): Promise<IProjectData[]> {
    return this.projectService.findByTeams(teamId);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() teamDTO: ProjectDTO): Promise<IProjectData> {
    return this.projectService.create(teamDTO);
  }

  @Put(':id')
  update(
    @Body() teamDTO: ProjectDTO,
    @Param('id') id: string,
  ): Promise<IProjectData | ErrorMessage> {
    return this.projectService.update(teamDTO, id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<IProjectData | ErrorMessage> {
    return this.projectService.delete(id);
  }
}
