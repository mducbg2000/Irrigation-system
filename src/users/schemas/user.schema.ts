import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ versionKey: false, timestamps: true })
export class User extends Document {
  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop({ enum: ["admin", "user"] })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
