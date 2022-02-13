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
import { TreesService } from "./trees.service";
import { UpdateTreeDto } from "./dto/update-tree.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "../auth/user/current-user.decorator";
import { Roles } from "../auth/role/roles.decorator";
import { Role } from "../auth/role/role.enum";

@ApiTags("Trees Resource")
@Controller("trees")
@ApiBearerAuth()
@Roles(Role.USER)
export class TreesController {
  constructor(private readonly treesService: TreesService) {}

  @Get()
  findAll(@CurrentUser() user) {
    return this.treesService.findAll(user._id);
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @CurrentUser() user) {
    const tree = await this.treesService.findOne(id);
    if (await this.treesService.checkOwner(tree.espId, user._id)) return tree;
    throw new ForbiddenException();
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateTreeDto: UpdateTreeDto) {
    return await this.treesService.update(id, updateTreeDto);
  }

  @HttpCode(204)
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.treesService.remove(id);
  }
}
