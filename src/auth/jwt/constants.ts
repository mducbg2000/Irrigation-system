import { SetMetadata } from "@nestjs/common";

export const jwtConstants = { secret: "team-4-iot" };

export class JwtPayload {
  _id: string;
  username: string;
  role: string;
}

export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
