import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import * as mongoose from "mongoose";
import { User } from "../../users/schemas/user.schema";
import { Tree } from "../../trees/schemas/tree.schema";
import { Tank } from "../../tanks/schemas/tank.schema";

@Schema({ versionKey: false, timestamps: true })
export class Esp32 extends mongoose.Document {
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  owner: User;

  @ApiProperty()
  @Prop({ unique: true })
  espId: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, default: [], ref: Tree.name }])
  trees: Tree[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, default: [], ref: Tank.name }])
  tanks: Tank[];
}

export const Esp32Schema = SchemaFactory.createForClass(Esp32);
