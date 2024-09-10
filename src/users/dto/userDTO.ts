import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class IUserDTO {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'lastName is required' })
  @IsString()
  lastName: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  team_id?: string;
}
