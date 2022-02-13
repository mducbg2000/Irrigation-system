import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: "mqtt://broker.emqx.io:1883",
      username: "tronghai",
      password: "1a2s3d4f5g",
    },
  });

  const config = new DocumentBuilder()
    .setTitle("Irrigation System API")
    .setVersion("1.0")
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      name: "JWT",
      description: "Enter access token",
      in: "header",
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("/", app, document);

  await app.startAllMicroservices();

  await app.listen(3001);
}

bootstrap().then(() => console.log("Server run in: http://localhost:3001"));
