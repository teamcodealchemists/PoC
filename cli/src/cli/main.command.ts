// src/cli/main.command.ts
import { CommandFactory } from 'nest-commander';
import { CliModule } from './cli.module';

async function bootstrap() {
  await CommandFactory.run(CliModule, {
    logger: ['error', 'warn'], // oppure ['log', 'error', 'warn', 'debug']
  });
}
bootstrap();
