import {
  Body,
  Controller,
  Inject,
  OnApplicationBootstrap,
  Post,
} from "@nestjs/common";
import { ClientMqtt, EventPattern, Payload } from "@nestjs/microservices";
import { SensorsService } from "./sensors.service";
import {
  MoistureSensor,
  Sensor,
  TankSensor,
  ValveSensor,
} from "./sensors.schema";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags("Sensors Controller")
@Controller("sensors")
export class SensorsController implements OnApplicationBootstrap {
  constructor(
    @Inject("MQTT_SERVICE") private client: ClientMqtt,
    private sensorService: SensorsService
  ) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  @EventPattern("CEIOT/G4/current-liquid-level")
  async currentLiquidLevel(@Payload() data: TankSensor) {
    await this.sensorService.updateLiquidLevel(data);
  }

  @EventPattern("CEIOT/G4/current-soil-moisture")
  async currentSoilMoisture(@Payload() data: MoistureSensor) {
    await this.sensorService.updateSoilMoisture(data);
  }

  @EventPattern("CEIOT/G4/valve-status")
  async currentValveStatus(@Payload() data: ValveSensor) {
    await this.sensorService.updateValveStatus(data);
  }

  @Post("water-tree")
  async waterTree(@Body() sensor: Sensor) {
    this.client.emit("CEIOT/G4/water-tree", sensor);
  }
}
