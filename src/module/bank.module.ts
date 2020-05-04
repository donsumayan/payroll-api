import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BankController } from '../controller/bank.controller';
import { BankEntity } from '../entity/bank.entity';
import { BankService } from '../service/bank.service';

@Module({
  imports: [TypeOrmModule.forFeature([BankEntity])],
  controllers: [BankController],
  providers: [BankService],
})
export class BankModule {}
