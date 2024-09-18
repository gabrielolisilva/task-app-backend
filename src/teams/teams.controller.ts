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
import { IUsersData } from 'src/users/interface/users.interface';
import { UsersService } from 'src/users/users.service';

@Controller('teams')
export class TeamsController {
  constructor(
    private readonly teamService: TeamsService,
    private readonly userService: UsersService,
  ) {}

  @Get()
  findAll(): Promise<ITeamData[]> {
    return this.teamService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<ITeamData | ErrorMessage> {
    return this.teamService.findById(id);
  }

  @Get('users/:team_id')
  findByTeamId(
    @Param('team_id') team_id: string,
  ): Promise<IUsersData[] | ErrorMessage> {
    return this.userService.getUserByTeamId(team_id);
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
