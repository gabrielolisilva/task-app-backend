import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProjectDTO {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  team_id: string;
}
