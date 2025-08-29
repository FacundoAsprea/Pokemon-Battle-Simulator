import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway(3100)
export class Gateway {
  @SubscribeMessage('test')
  onTest(@MessageBody() body: any) {
    console.log(body);
  }
}
