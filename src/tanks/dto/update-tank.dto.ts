import { ApiProperty } from "@nestjs/swagger";

export class UpdateTankDto {
  @ApiProperty()
  area: number;

  @ApiProperty()
  height: number;

  @ApiProperty()
  liquidLevel: number;
}
