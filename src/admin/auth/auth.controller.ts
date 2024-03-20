import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  ParseUUIDPipe,
  Get,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateUserDto } from './dto/update_user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiResponse({
    status: 201,
    description: 'The User has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'This User has already been registered.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 500,
    description: 'There was a problem with the server, please try again later',
  })
  @ApiOperation({
    summary: 'signup',
    description: 'signup.',
  })
  async signup(@Body() dto: SignupUserDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'The User has been successfully login.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 500,
    description: 'There was a problem with the server, please try again later',
  })
  @ApiOperation({
    summary: 'login',
    description: 'login.',
  })
  login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }

  @Put('reset-password')
  @ApiResponse({
    status: 201,
    description: 'The Password has been successfully update.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 500,
    description: 'There was a problem with the server, please try again later',
  })
  @ApiOperation({
    summary: 'reset-password',
    description: 'reset-password.',
  })
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @Get('find')
  @ApiResponse({
    status: 200,
    description: ' Find All User successfully .',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. The provided data is not valid.',
  })
  @ApiResponse({
    status: 500,
    description:
      'Internal Server Error. There was a problem with the server, please try again later.',
  })
  @ApiOperation({
    summary: 'find all user',
    description: 'find user.',
  })
  findAll() {
    return this.authService.findAll();
  }


  

  @Put(':id')
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully Updated.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 500,
    description: 'There was a problem with the server, please try again later',
  })
  @ApiOperation({
    summary: 'update the user',
    description: 'update user.',
  })
  updatesuperAdmin(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.authService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: ' Delete User successfully .',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. The provided data is not valid.',
  })
  @ApiResponse({
    status: 500,
    description:
      'Internal Server Error. There was a problem with the server, please try again later.',
  })
  @ApiOperation({
    summary: 'delete user',
    description: 'delete user.',
  })
  deletesuperuser(@Param('id', ParseUUIDPipe) id: string) {
    return this.authService.delete(id);
  }


}
