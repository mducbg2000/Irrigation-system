import { Module } from "@nestjs/common";
import { TanksService } from "./tanks.service";
import { TanksController } from "./tanks.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Tank, TankSchema } from "./schemas/tank.schema";
import { Esp32, Esp32Schema } from "../esp32s/schemas/esp32.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Esp32.name, schema: Esp32Schema },
      { name: Tank.name, schema: TankSchema },
    ]),
  ],
  controllers: [TanksController],
  providers: [TanksService],
})
export class TanksModule {}
