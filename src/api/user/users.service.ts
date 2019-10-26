import { Injectable } from '@nestjs/common';
import { DataRepository } from '../data/data.repository';

@Injectable()
export class UsersService {

    constructor(private readonly dataRepository: DataRepository) { }

    async findOne(username: string): Promise<any | undefined> {
        console.log('------UsersService-------')
        return this.dataRepository.users.find(user => user.username === username);
    }
}
