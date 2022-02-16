import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Logger } from "@nestjs/common";
import { Tree } from "../trees/schemas/tree.schema";
import { Public } from "../auth/jwt/constants";
import { Tank } from "../tanks/schemas/tank.schema";

@WebSocketGateway({ cors: true })
@Public()
export class SocketGateway {
  @WebSocketServer()
  private server: Server;

  private logger = new Logger("SocketGateway");

  private clientIds = new Map<string, string>();

  updateTree(tree: Tree, owner: string) {
    const clientId = this.clientIds.get(owner);
    this.server.to(clientId).emit(`update-tree/${tree.espId}/${tree.index}`, tree);
  }

  updateTank(tank: Tank, owner: string) {
    const clientId = this.clientIds.get(owner);
    this.server.to(clientId).emit(`update-tank/${tank.espId}/${tank.index}`, tank);
  }

  @SubscribeMessage("login")
  login(client: Socket, userId: string) {
    this.clientIds.set(userId, client.id);
    this.logger.log(`${userId} is ${client.id}`);
  }

}
