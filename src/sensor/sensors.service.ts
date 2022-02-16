import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Esp32 } from "../esp32s/schemas/esp32.schema";
import { Model } from "mongoose";
import { Tree } from "../trees/schemas/tree.schema";
import { Tank } from "../tanks/schemas/tank.schema";
import { MoistureSensor, TankSensor, ValveSensor } from "./sensors.schema";

@Injectable()
export class SensorsService {
  constructor(
    @InjectModel(Esp32.name) private esp32Model: Model<Esp32>,
    @InjectModel(Tree.name) private treeModel: Model<Tree>,
    @InjectModel(Tank.name) private tankModel: Model<Tank>
  ) {}

  async updateLiquidLevel(sensor: TankSensor) {
    const esp = await this.esp32Model
      .findOne({ espId: sensor.espId })
      .populate("tanks")
      .exec();
    if (!esp) return null;
    const tank = esp.tanks.find((tank) => tank.index == sensor.index);
    tank.liquidLevel = sensor.liquidLevel > tank.height ? 0 : tank.height - sensor.liquidLevel;
    return {
      owner: esp.owner._id.toString(),
      tank: await tank.save()
    }
  }

  async updateSoilMoisture(sensor: MoistureSensor) {
    const esp = await this.esp32Model
      .findOne({ espId: sensor.espId })
      .populate("trees")
      .exec();
    if (!esp) return null;
    const tree = esp.trees.find((tree) => tree.index == sensor.index);
    tree.currentMoisture = sensor.currentMoisture > 100 ? 100 : sensor.currentMoisture;
    return {
      owner: esp.owner._id.toString(),
      tree: await tree.save()
    }
  }

  async updateValveStatus(sensor: ValveSensor) {
    const esp = await this.esp32Model
      .findOne({ espId: sensor.espId })
      .populate("trees")
      .exec();
    if (!esp) return null;
    const tree = esp.trees.find((tree) => tree.index == sensor.index);
    tree.isValveOpen = sensor.isValveOpen;
    return {
      owner: esp.owner._id.toString(),
      tree: await tree.save()
    }
  }
}
