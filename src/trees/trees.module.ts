import { Module } from "@nestjs/common";
import { TreesService } from "./trees.service";
import { TreesController } from "./trees.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Tree, TreeSchema } from "./schemas/tree.schema";
import { Esp32, Esp32Schema } from "../esp32s/schemas/esp32.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Esp32.name, schema: Esp32Schema },
      { name: Tree.name, schema: TreeSchema },
    ]),
  ],
  controllers: [TreesController],
  providers: [TreesService],
})
export class TreesModule {}
