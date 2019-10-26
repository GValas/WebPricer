import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DataRepository } from '../data/data.repository';

@Module({
  providers: [UsersService, DataRepository],
  exports: [UsersService],
})
export class UsersModule { }
