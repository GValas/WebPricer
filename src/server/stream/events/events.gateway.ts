import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Client } from 'ws';
import { BlackScholes } from '../../../shared/helpers/blackscholes';
import { UnderlyingService } from '../../shared/services/underlying.service';

@WebSocketGateway(8080)
export class EventsGateway {

  constructor(
    private readonly bs: BlackScholes,
    private readonly underlyingService: UnderlyingService) { }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  async onEvent(client: Client, data: any) {


    const udl = (await this.underlyingService.findAll());
    console.log(udl);

    const mat = 1;
    const spot = 100;
    const rate = 0.08;
    const vol = 0.3;
    const dt = mat / 365.0;
    const spotGen = this.bs.generatePath(spot, vol, rate, dt);

    return interval(10)
      .pipe(
        map(i => {

          const nextSpot = spotGen.next().value as number;
          const timeToMaturity = mat - i * dt;
          const df = Math.exp(-rate * timeToMaturity);
          const fwd = nextSpot / df;
          const call = this.bs.callPrice(fwd, spot, df, vol, timeToMaturity);

          return {
            step: i,
            spot: nextSpot,
            fwd,
            call,
          };
        }),
      );
  }

}
