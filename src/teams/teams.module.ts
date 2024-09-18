import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [TeamsController],
  providers: [TeamsService, UsersService],
})
export class TeamsModule {}
