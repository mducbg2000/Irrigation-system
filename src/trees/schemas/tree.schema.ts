import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ versionKey: false, timestamps: true })
export class Tree extends Document {
  @Prop()
  espId: string;

  @Prop()
  index: number;

  @Prop()
  name: string;

  @Prop()
  maxMoisture: number;

  @Prop()
  minMoisture: number;

  @Prop()
  currentMoisture: number;

  @Prop()
  isValveOpen: boolean;
}

export const TreeSchema = SchemaFactory.createForClass(Tree);
