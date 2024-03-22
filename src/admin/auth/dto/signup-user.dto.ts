import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignupUserDto {
  @IsEmail()
  @ApiProperty({
    description: 'Enter the email',
    example: 'example12@gmail.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    description: 'Enter the password',
    required: true,
  })
  @IsString()
  password: string;

  @IsString()
  @ApiProperty({
    description: 'Enter the username',
    example: 'demo_admin',
    required: true,
  })
  username: string;
}
