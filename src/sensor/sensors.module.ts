import { Module } from "@nestjs/common";
import { SensorsController } from "./sensors.controller";
import { SensorsService } from "./sensors.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MongooseModule } from "@nestjs/mongoose";
import { Esp32, Esp32Schema } from "../esp32s/schemas/esp32.schema";
import { Tree, TreeSchema } from "../trees/schemas/tree.schema";
import { Tank, TankSchema } from "../tanks/schemas/tank.schema";
import { User, UserSchema } from "../users/schemas/user.schema";
import { SocketModule } from "../socket/socket.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Esp32.name, schema: Esp32Schema },
      { name: Tree.name, schema: TreeSchema },
      { name: Tank.name, schema: TankSchema },
      { name: User.name, schema: UserSchema },
    ]),
    ClientsModule.register([
      {
        name: "MQTT_SERVICE",
        transport: Transport.MQTT,
        options: {
          url: "mqtt://broker.emqx.io:1883",
          username: "tronghai",
          password: "1a2s3d4f5g",
        },
      },
    ]),
    SocketModule
  ],
  controllers: [SensorsController],
  providers: [SensorsService],
})
export class SensorsModule {}
