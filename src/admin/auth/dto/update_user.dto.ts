// update-user.dto.ts
import { IsOptional, IsString, IsBoolean, IsDateString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Enter the username',
    example: 'demo_admin',
    required: true,
  })
  username?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  first_name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  last_name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  timezone_id?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  is_term_con?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone_number?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  country_code?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fcm_token?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  access_token?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  refresh_token?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  client_key?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  secret_key?: string;

}
