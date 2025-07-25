import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    logger: logger,
    transport: Transport.NATS,
    options: {
      servers: ['nats://nats:4222'], // Nome del container NATS
    },
  });

  await app.listen();
  console.log('Microservice is listening');
}
bootstrap();
