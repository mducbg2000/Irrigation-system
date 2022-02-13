import { Injectable } from "@nestjs/common";
import { UpdateTreeDto } from "./dto/update-tree.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Tree } from "./schemas/tree.schema";
import { Model } from "mongoose";
import { Esp32 } from "../esp32s/schemas/esp32.schema";

@Injectable()
export class TreesService {
  constructor(
    @InjectModel(Tree.name) private treeModel: Model<Tree>,
    @InjectModel(Esp32.name) private espModel: Model<Esp32>
  ) {}

  async findAll(ownerId: string) {
    const listEsp = await this.espModel
      .find({ owner: ownerId })
      .populate("trees")
      .exec();
    let result: Tree[] = [];

    listEsp.forEach((esp) => {
      result = [...result, ...esp.trees];
    });

    return result;
  }

  async findOne(id: string) {
    return await this.treeModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateTreeDto: UpdateTreeDto) {
    return this.treeModel.findByIdAndUpdate({ _id: id }, updateTreeDto, {
      new: true,
    });
  }

  async remove(id: string) {
    await this.treeModel.remove({ _id: id }).exec();
  }

  async checkOwner(espId: string, owner: string) {
    const esp = await this.espModel.findOne({ espId: espId }).exec();
    return esp.owner._id == owner;
  }
}
