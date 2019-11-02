import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WsResponse,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('afterInit');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`client disconnected : ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`client connected : ${client.id}`);
  }

  @SubscribeMessage('realtime-request')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    this.logger.log(`emitting data`);
    return { event: 'realtime-response', data: 'text' };
  }
}
