import { ApiProperty } from "@nestjs/swagger";

export class Sensor {
  @ApiProperty()
  espId: string;
  @ApiProperty()
  index: number;
}

export class MoistureSensor extends Sensor {
  currentMoisture: number;
}

export class TankSensor extends Sensor {
  liquidLevel: number;
}

export class ValveSensor extends Sensor {
  isValveOpen: boolean;
}
