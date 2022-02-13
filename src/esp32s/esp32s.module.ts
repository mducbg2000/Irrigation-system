import { Module } from "@nestjs/common";
import { Esp32sService } from "./esp32s.service";
import { Esp32sController } from "./esp32s.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Esp32, Esp32Schema } from "./schemas/esp32.schema";
import { Tree, TreeSchema } from "../trees/schemas/tree.schema";
import { Tank, TankSchema } from "../tanks/schemas/tank.schema";
import { User, UserSchema } from "../users/schemas/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Esp32.name, schema: Esp32Schema },
      { name: Tree.name, schema: TreeSchema },
      { name: Tank.name, schema: TankSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [Esp32sController],
  providers: [Esp32sService],
  exports: [Esp32sService],
})
export class Esp32sModule {}
