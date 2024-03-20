import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Enter the email',
    example: 'example12@gmail.com',
    required: true,
  })
    @IsEmail()
    email: string;
  
    @ApiProperty()
    @IsNotEmpty()
    password: string;
  }