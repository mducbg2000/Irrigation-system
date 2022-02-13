import { ApiProperty } from "@nestjs/swagger";

export class CreateEsp32Dto {
  @ApiProperty({ required: false })
  ownerId: string;

  @ApiProperty()
  espId: string;
}
