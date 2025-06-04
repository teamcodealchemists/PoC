import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: ['nats://nats:4222'],
    },
  });

   try {
    await app.startAllMicroservices();
    console.log('Microservizi avviati');
  } catch (err) {
    console.error('Errore avviando microservizi:', err);
  }
  await app.listen(3000);   
  
  console.log("AVVIATO CORRETTAMENTE MAIN INVENTARIO-A");
}
bootstrap();
