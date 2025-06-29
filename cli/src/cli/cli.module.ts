import { Module } from '@nestjs/common';
import { ListCommand } from './commands/list.command';

@Module({
  providers: [ListCommand],
})
export class CliModule {}
