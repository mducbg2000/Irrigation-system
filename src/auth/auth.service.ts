import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcrypt";
import { AuthDto } from "src/auth/user/auth.dto";
import { JwtPayload } from "./jwt/constants";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async validateUser(payload: JwtPayload) {
    const user = await this.usersService.findByUsername(payload.username);
    if (!user) throw new UnauthorizedException("Invalid user");
    return user;
  }

  async login(loginDto: AuthDto) {
    const user = await this.usersService.findByUsername(loginDto.username);
    if (!user) throw new BadRequestException("Username not found");
    const hashPwd = user.password;
    const isMatch = await bcrypt.compare(loginDto.password, hashPwd);

    if (!isMatch) {
      throw new BadRequestException("Password incorrect");
    }

    const payload: JwtPayload = {
      _id: user._id,
      username: user.username,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: AuthDto) {
    const createUserDto: CreateUserDto = {
      ...registerDto,
      role: "user",
    };
    return await this.usersService.create(createUserDto);
  }
}
