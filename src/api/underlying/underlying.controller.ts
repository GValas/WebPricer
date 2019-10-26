import { Controller, Param, Get } from '@nestjs/common';
import { UnderlyingService } from './underlying.service';
import { UnderlyingCode } from "../../shared/models/underlying-code";

@Controller('underlyings')
export class UnderlyingController {

    constructor(private readonly underlyingService: UnderlyingService) { }

    @Get()
    async findAll() {
      return await this.underlyingService.getAll();
    }

    @Get(':code')
    async findOne(@Param('code') code: UnderlyingCode) {
      return await this.underlyingService.getByCode(code);
    }

}
