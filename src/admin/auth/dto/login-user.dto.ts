import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginUserDto {
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
}