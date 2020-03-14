import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import * as uuid from 'uuid'
import { httpResponse } from '../http-response.interface'

const logger: Logger = new Logger('RequestMonitorInterceptor')

@Injectable()
export class RequestMonitorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    // const id = uuid.v4();
    // const req = context.switchToHttp().getRequest();
    // const res = context.switchToHttp().getResponse();

    const startDate = new Date()
    return next.handle()
      .pipe(
        map(value => {
          const endDate = new Date()
          const resp: httpResponse = {
            request: {
              startDate,
              endDate,
              durationInMs: (endDate.getTime() - startDate.getTime()),
            },
            reponse: value,
          }
          logger.log(JSON.stringify(resp))
          return resp
        }),
      )
  }
}
