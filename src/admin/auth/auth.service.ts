import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignupUserDto } from './dto/signup-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwt: JwtService,
  ) {}

  async signup(dto: SignupUserDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { username: dto.username }],
      },
    });

    if (user) {
      if (user.email === dto.email && !user.is_deleted) {
        throw new BadRequestException('Email is already taken.');
      } else if (user.username === dto.username && !user.is_deleted) {
        throw new BadRequestException('Username is already taken.');
      }
    }
    if (
      user &&
      user.is_deleted === true &&
      user.email === dto.email &&
      user.username === dto.username
    ) {
      const newPassword = await this.hashPassword(dto.password);

      const updatedUser = await this.prismaService.user.update({
        where: { id: user.id },
        data: { is_deleted: false, password: newPassword },
      });
      return updatedUser;
    }

    const newPassword = await this.hashPassword(dto.password);

    const newUser = await this.prismaService.user.create({
      data: {
        email: dto.email,
        password: newPassword,
        username: dto.username,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userPassword, ...sanitizedUser } = newUser;
    return sanitizedUser;
  }

  //login
  async login(dto: LoginUserDto) {
    const { email, password: userPassword } = dto;
    const foundUser = await this.prismaService.user.findUnique({
      where: { email, is_deleted: false },
    });
    if (!foundUser) {
      throw new BadRequestException('Invalid email');
    }
    const isMatch = await this.comparePassword({
      password: userPassword,
      hash: foundUser.password,
    });
    if (!isMatch) {
      throw new BadRequestException('Invalid password');
    }

    const token = await this.signToken({
      id: foundUser.id,
      email: foundUser.email,
    });
    return {
      id: foundUser.id,
      email: foundUser.email,
      username: foundUser.username,
      created_at: foundUser.created_at,
      updated_at: foundUser.updated_at,
      token,
    };
  }

  //find user
  async findAll() {
    const Getall = await this.prismaService.user.findMany();
    if (!Getall)
      throw new NotFoundException('there is no user! creat the user first');

    return Getall;
  }

  //update user
  async update(id: string, dto: UpdateUserDto) {
    const exist = await this.prismaService.user.findUnique({
      where: {
        id: id,
        is_deleted: false,
      },
    });
    if (!exist) throw new NotFoundException('not exist kindly Register!');

    const newData = await this.prismaService.user.update({
      where: { id },
      data: {
        username: dto.username,
        image: dto.image,
        first_name: dto.first_name,
        last_name: dto.last_name,
        timezone_id: dto.timezone_id,
        is_active: dto.is_active,
        is_term_con: dto.is_term_con,
        phone_number: dto.phone_number,
        country_code: dto.country_code,
        fcm_token: dto.fcm_token,
        access_token: dto.access_token,
        refresh_token: dto.refresh_token,
        client_key: dto.client_key,
        secret_key: dto.secret_key,
      },
    });
    return newData;
  }

  //delete
  async delete(id: string) {
    const check = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!check) throw new BadRequestException('not found');
    await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        is_deleted: true,
        deleted_at: new Date(),
      },
    });

    return { message: ' user deleted!!' };
  }

  //reset password
  async resetPassword(dto: ResetPasswordDto) {
    const { email, password } = dto;
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('Invalid Email');
    }

    const newPassword = await this.hashPassword(password);

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        password: newPassword,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userPassword, ...sanitizedUser } = user;

    return sanitizedUser;
  }

  // compare password
  async comparePassword(args: { password: string; hash: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  //jwt token
  async signToken(args: { id: string; email: string }) {
    const payload = args;
    const secretFromEnv = process.env.JWT_SECRET;

    if (!secretFromEnv) {
      throw new Error('JWT secret is not defined in the environment.');
    }

    return await this.jwt.signAsync(payload, { secret: secretFromEnv });
  }

  //hash password
  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
