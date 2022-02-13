import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TreesModule } from "./trees/trees.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./auth/jwt/jwt-auth.guard";
import { RolesGuard } from "./auth/role/roles.guard";
import { Esp32sModule } from "./esp32s/esp32s.module";
import { TanksModule } from "./tanks/tanks.module";
import { SensorsModule } from "./sensor/sensors.module";
import { SocketModule } from "./socket/socket.module";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/iot"),
    TreesModule,
    AuthModule,
    UsersModule,
    TanksModule,
    Esp32sModule,
    SensorsModule,
    SocketModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
