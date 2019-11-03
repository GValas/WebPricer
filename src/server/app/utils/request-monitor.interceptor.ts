import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import * as uuid from 'uuid';

const logger: Logger = new Logger('RequestMonitorInterceptor');

interface httpResponse {
  request: {
    startDate: Date;
    endDate: Date;
    durationInMs: number;
  };
  reponse: any;
}

@Injectable()
export class RequestMonitorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    // const id = uuid.v4();
    // const req = context.switchToHttp().getRequest();
    // const res = context.switchToHttp().getResponse();

    const startDate = new Date();
    return next.handle()
      .pipe(
        map(value => {
          const endDate = new Date();
          const resp: httpResponse = {
            request: {
              startDate,
              endDate,
              durationInMs: (endDate.getTime() - startDate.getTime()),
            },
            reponse: value,
          };
          logger.log(JSON.stringify(resp));
          return resp;
        }),
      );
  }
}
