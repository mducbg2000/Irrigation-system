import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  Patch,
} from "@nestjs/common";
import { TanksService } from "./tanks.service";
import { UpdateTankDto } from "./dto/update-tank.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "../auth/user/current-user.decorator";
import { Roles } from "../auth/role/roles.decorator";
import { Role } from "../auth/role/role.enum";

@ApiTags("Tanks Resource")
@Controller("tanks")
@ApiBearerAuth()
@Roles(Role.USER)
export class TanksController {
  constructor(private readonly tanksService: TanksService) {}

  @Get()
  findAll(@CurrentUser() user) {
    return this.tanksService.findAll(user._id);
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @CurrentUser() user) {
    const tank = await this.tanksService.findOne(id);
    if (await this.tanksService.checkOwner(tank.espId, user._id)) return tank;
    throw new ForbiddenException();
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTankDto: UpdateTankDto) {
    return this.tanksService.update(id, updateTankDto);
  }

  @HttpCode(204)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.tanksService.remove(id);
  }
}
