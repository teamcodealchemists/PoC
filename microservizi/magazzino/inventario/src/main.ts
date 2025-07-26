import { response } from 'express';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';


import { OutboundResponseSerializer } from './interfaces/nats/serializer/outbound-response.serializer';
import { InboundRequestDeserializer } from './interfaces/nats/deserializer/inbound-response.deserializer';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    logger: logger,
    transport: Transport.NATS,
    options: {
      servers: ['nats://nats:4222'], // Nome del container NATS
      deserializer: new InboundRequestDeserializer(),
      serializer: new OutboundResponseSerializer(),
    },
  });

  await app.listen();
  console.log('Microservice is listening');
}
bootstrap();
