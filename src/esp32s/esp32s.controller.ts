import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { Esp32sService } from "./esp32s.service";
import { CreateEsp32Dto } from "./dto/create-esp32.dto";
import { UpdateEsp32Dto } from "./dto/update-esp32.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "../auth/role/roles.decorator";
import { Role } from "../auth/role/role.enum";

@ApiTags("Esp32s Resource")
@Controller("esp32s")
@ApiBearerAuth()
@Roles(Role.ADMIN)
export class Esp32sController {
  constructor(private readonly esp32sService: Esp32sService) {}

  @Post()
  create(@Body() createEsp32Dto: CreateEsp32Dto) {
    return this.esp32sService.create(createEsp32Dto);
  }

  @Get()
  findAll() {
    return this.esp32sService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.esp32sService.findOne({ _id: id });
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateEsp32Dto: UpdateEsp32Dto) {
    return this.esp32sService.update(id, updateEsp32Dto);
  }

  @HttpCode(204)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.esp32sService.remove(id);
  }
}
