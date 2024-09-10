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
import { TeamsService } from './teams.service';
import { ITeamData } from './interface/teams.interface';
import { ITeamDTO } from './dto/teamDTO';
import { ErrorMessage } from 'src/utils/errorMessage';

@Controller('teams')
export class TeamsController {
  constructor(private teamService: TeamsService) {}

  @Get()
  findAll(): Promise<ITeamData[]> {
    return this.teamService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<ITeamData | ErrorMessage> {
    return this.teamService.findById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() teamDTO: ITeamDTO): Promise<ITeamData> {
    return this.teamService.create(teamDTO);
  }

  @Put(':id')
  update(
    @Body() teamDTO: ITeamDTO,
    @Param('id') id: string,
  ): Promise<ITeamData | ErrorMessage> {
    return this.teamService.update(teamDTO, id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<ITeamData | ErrorMessage> {
    return this.teamService.delete(id);
  }
}
