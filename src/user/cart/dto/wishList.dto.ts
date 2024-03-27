import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class WishListDto {
  @ApiProperty()
  @IsUUID(undefined, { each: true })
  @IsString()
  user_id: string;

  @ApiProperty()
  @IsUUID(undefined, { each: true })
  @IsString()
  product_id: string;

  @ApiProperty()
  @IsBoolean()
  wish_list: boolean;
}
