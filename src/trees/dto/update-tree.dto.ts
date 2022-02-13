import { ApiProperty } from "@nestjs/swagger";

export class UpdateTreeDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  maxMoisture: number;
  @ApiProperty()
  minMoisture: number;
  @ApiProperty()
  currentMoisture: number;
  @ApiProperty()
  isValveOpen: boolean;
}
