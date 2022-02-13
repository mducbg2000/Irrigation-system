import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthDto } from "src/auth/user/auth.dto";
import { AuthService } from "./auth.service";
import { Public } from "./jwt/constants";
import { CurrentUser } from "./user/current-user.decorator";

@ApiTags("Authentication")
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(200)
  @Post("/login")
  async login(@Body() loginDto: AuthDto) {
    return await this.authService.login(loginDto);
  }

  @Public()
  @Post("/register")
  async register(@Body() registerDto: AuthDto) {
    return await this.authService.register(registerDto);
  }

  @ApiBearerAuth()
  @Get("/whoami")
  async getCurrentUser(@CurrentUser() currentUser) {
    const { _id, username, role } = currentUser;
    return {
      _id,
      username,
      role,
    };
  }
}
