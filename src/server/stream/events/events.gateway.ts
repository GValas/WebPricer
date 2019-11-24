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
    let spot = 100;
    const strike = spot;
    const rate = 0.08;
    const volatility = 0.3;
    const dt = mat / 365.0;
    const spotGen = this.bs.generatePath(spot, volatility, rate, dt);

    return interval(10)
      .pipe(
        map(i => {

          spot = spotGen.next().value as number;
          const timeToMaturity = mat - i * dt;
          const call = this.bs.priceCall({
            spot,
            rate,
            timeToMaturity,
            strike,
            volatility,
          });

          return {
            step: i,
            spot,
            forward: call.forward,
            price: call.price,
          };
        }),
      );
  }

}
