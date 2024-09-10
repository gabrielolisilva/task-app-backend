import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class TaskDTO {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'Expiration date is required' })
  @IsDate()
  @Type(() => Date)
  expiration_date: Date;

  @IsNotEmpty({ message: 'Owner id is required' })
  @IsString()
  owner_id: string;

  @IsNotEmpty({ message: 'Project id is required' })
  @IsString()
  project_id: string;
}
