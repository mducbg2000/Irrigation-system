import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import * as mongoose from "mongoose";

@Schema({ versionKey: false, timestamps: true })
export class Tank extends mongoose.Document {
  @Prop()
  espId: string;

  @Prop()
  index: number;

  @ApiProperty()
  @Prop({ default: 0 })
  area: number;

  @ApiProperty({ default: 0 })
  @Prop()
  height: number;

  @ApiProperty({ default: 0 })
  @Prop()
  liquidLevel: number;
}

export const TankSchema = SchemaFactory.createForClass(Tank);
