import { IsNotEmpty, IsString } from 'class-validator';

export class loginDTO {
  @IsNotEmpty({ message: 'Email is required' })
  @IsString()
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  password: string;
}
