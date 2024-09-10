import { IsNotEmpty, IsString } from 'class-validator';

export class ITeamDTO {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString()
  description: string;
}
