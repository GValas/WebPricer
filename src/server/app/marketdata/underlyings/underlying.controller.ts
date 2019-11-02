import { Controller, Param, Get } from '@nestjs/common';
import { UnderlyingService } from './underlying.service';

@Controller('underlyings')
export class UnderlyingController {

  constructor(private readonly underlyingService: UnderlyingService) { }

  @Get()
  async findAll() {
    return await this.underlyingService.findAll();
  }

  @Get(':code')
  async findOne(@Param('code') code: string) {
    return await this.underlyingService.findByCode(code);
  }

}
