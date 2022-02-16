import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateEsp32Dto } from "./dto/create-esp32.dto";
import { UpdateEsp32Dto } from "./dto/update-esp32.dto";
import { Esp32 } from "./schemas/esp32.schema";
import { Tree } from "../trees/schemas/tree.schema";
import { Tank } from "../tanks/schemas/tank.schema";
import { User } from "../users/schemas/user.schema";

@Injectable()
export class Esp32sService {
  constructor(
    @InjectModel(Esp32.name) private esp32Model: Model<Esp32>,
    @InjectModel(Tree.name) private treeModel: Model<Tree>,
    @InjectModel(Tank.name) private tankModel: Model<Tank>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async create(createEsp32Dto: CreateEsp32Dto) {
    const newEsp32 = new this.esp32Model(createEsp32Dto);

    for (let i = 1; i < 5; i++) {
      const newTree = new this.treeModel({
        index: i,
        espId: createEsp32Dto.espId,
      });
      await newTree.save();
      newEsp32.trees.push(newTree);
    }

    const newTank = new this.tankModel({
      index: 1,
      espId: createEsp32Dto.espId,
    });
    await newTank.save();
    newEsp32.tanks.push(newTank);

    return await newEsp32.save();
  }

  async findAll() {
    return this.esp32Model.find().populate("owner").exec();
  }

  async findByOwner(ownerId: string) {
    return this.esp32Model
      .find({ owner: ownerId })
      .populate("trees")
      .populate("tanks")
      .exec();
  }

  async findOne(filter: any) {
    return this.esp32Model.findOne(filter).exec();
  }

  async update(id: string, updateEsp32Dto: UpdateEsp32Dto) {
    const esp = await this.esp32Model.findById(id).exec();
    esp.owner = await this.userModel.findById(updateEsp32Dto.ownerId).exec();
    return esp.save();
  }

  async remove(id: string) {
    const esp = await this.esp32Model.findById(id).exec();
    this.treeModel
      .remove({ espId: esp.espId })
      .then(() => console.log("Delete all tree of esp: " + esp.espId));
    this.tankModel
      .remove({ espId: esp.espId })
      .then(() => console.log("Delete all tank of esp: " + esp.espId));
    return await this.esp32Model.remove({ _id: id }).exec();
  }

  async checkOwner(espId: string, owner: string) {
    const esp = await this.findOne({ espId: espId });
    return owner == esp.owner._id;
  }
}
