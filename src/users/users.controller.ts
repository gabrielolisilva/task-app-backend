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
import { UsersService } from './users.service';
import { IUsersData } from './interface/users.interface';
import { ErrorMessage } from 'src/utils/errorMessage';
import { IUserDTO } from './dto/userDTO';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  findAll(): Promise<IUsersData[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<IUsersData | ErrorMessage> {
    return this.userService.findById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() userDTO: IUserDTO): Promise<IUsersData> {
    return this.userService.create(userDTO);
  }

  @Put(':id')
  update(
    @Body() userDTO: IUserDTO,
    @Param('id') id: string,
  ): Promise<IUsersData | ErrorMessage> {
    return this.userService.update(userDTO, id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<IUsersData | ErrorMessage> {
    return this.userService.delete(id);
  }

  @Post('join/team')
  joinTeam(
    @Body() data: { user_id: string; team_id: string },
  ): Promise<IUsersData | ErrorMessage> {
    return this.userService.joinTeam(data);
  }
}
