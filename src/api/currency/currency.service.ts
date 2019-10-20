import { Injectable, Logger } from '@nestjs/common';
import { CurrencyCode } from '../../shared/models/currency.model';
import { DataRepository } from '../data/data.repository';

const logger: Logger = new Logger('CurrencyService');

@Injectable()
export class CurrencyService {
    constructor(private readonly dataRepository: DataRepository) { }

    async getAll() {
        logger.log('getAll');
        const res = this.dataRepository.currencies.value();
        return await res;
    }

    async getByCode(code: CurrencyCode) {
        logger.log(`getByCode id=${code}`);
        return await this.dataRepository.currencies.find(x => x.code === code).value();
    }

}
