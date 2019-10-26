import { Injectable, Logger } from '@nestjs/common';
import { DataRepository } from '../data/data.repository';
import { UnderlyingCode } from "../../shared/models/underlying-code";
const logger: Logger = new Logger('UnderlyingService');

@Injectable()
export class UnderlyingService {
    constructor(private readonly dataRepository: DataRepository) { }

    async getAll() {
        logger.log('getAll');
        const res = this.dataRepository.underlyings.value();
        return await res;
    }

    async getByCode(code: UnderlyingCode) {
        logger.log(`getByCode id=${code}`);
        return await this.dataRepository.underlyings.find(x => x.code === code).value();
    }

}
