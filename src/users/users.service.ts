import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.role !== "user" && createUserDto.role !== "admin")
      throw new BadRequestException("The role must be user or admin");
    const hashPass = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModel(createUserDto);
    newUser.password = hashPass;
    return await newUser.save();
  }

  async findByUsername(username: string) {
    return this.userModel.findOne({ username: username }).exec();
  }

  async findAll() {
    const listUser = await this.userModel.find().exec();
    return listUser.map((data) => {
      return { _id: data._id, username: data.username, role: data.role };
    });
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
