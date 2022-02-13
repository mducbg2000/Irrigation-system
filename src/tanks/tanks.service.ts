import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UpdateTankDto } from "./dto/update-tank.dto";
import { Tank } from "./schemas/tank.schema";
import { Esp32 } from "../esp32s/schemas/esp32.schema";

@Injectable()
export class TanksService {
  constructor(
    @InjectModel(Tank.name) private tankModel: Model<Tank>,
    @InjectModel(Esp32.name) private espModel: Model<Esp32>
  ) {}

  async findAll(ownerId: string) {
    const listEsp = await this.espModel
      .find({ ownerId: ownerId })
      .populate("tanks")
      .exec();
    let result: Tank[] = [];

    listEsp.forEach((esp) => {
      result = [...result, ...esp.tanks];
    });

    return result;
  }

  async findOne(id: string) {
    return this.tankModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateTankDto: UpdateTankDto) {
    return this.tankModel.findByIdAndUpdate({ _id: id }, updateTankDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.tankModel.remove({ _id: id }).exec();
  }

  async checkOwner(espId: string, owner: string) {
    const esp = await this.espModel.findOne({ espId: espId }).exec();
    return esp.owner._id == owner;
  }
}
