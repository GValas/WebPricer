import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    // tslint:disable-next-line:ban-types
    use(req: Request, res: Response, next: Function) {
        console.log('Request...')
        next()
    }
}

// tslint:disable-next-line:ban-types
export function logger(req: Request, res: Response, next: Function) {
    console.log('incomming request')
    next()
}
