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
import { SocketGateway } from "../socket/socket.gateway";

@ApiBearerAuth()
@ApiTags("Sensors Controller")
@Controller("sensors")
export class SensorsController implements OnApplicationBootstrap {
  constructor(
    @Inject("MQTT_SERVICE") private client: ClientMqtt,
    private socketGateway: SocketGateway,
    private sensorService: SensorsService
  ) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  @EventPattern("CEIOT/G4/current-liquid-level")
  async currentLiquidLevel(@Payload() sensor: TankSensor) {
    const updated = await this.sensorService.updateLiquidLevel(sensor);
    this.socketGateway.updateTank(updated.tank, updated.owner);
  }

  @EventPattern("CEIOT/G4/current-soil-moisture")
  async currentSoilMoisture(@Payload() sensor: MoistureSensor) {
    const updated = await this.sensorService.updateSoilMoisture(sensor);
    this.socketGateway.updateTree(updated.tree, updated.owner);
  }

  @EventPattern("CEIOT/G4/valve-status")
  async currentValveStatus(@Payload() sensor: ValveSensor) {
    const updated = await this.sensorService.updateValveStatus(sensor);
    this.socketGateway.updateTree(updated.tree, updated.owner);
  }

  @Post("water-tree")
  async waterTree(@Body() sensor: ValveSensor) {
    const updated = await this.sensorService.updateValveStatus(sensor);
    this.client.emit("CEIOT/G4/water-tree", sensor);
    this.socketGateway.updateTree(updated.tree, updated.owner);
  }
}
