import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller'; 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: ['nats://nats:4222'],
    },
  });

  await app.startAllMicroservices();
  console.log('Microservizi ordini avviati');
  await app.listen(process.env.PORT ?? 3001); // Porta diversa da inventario
   console.log("AVVIATO CORRETTAMENTE MAIN ORDINI-A");

  const appController = app.get(AppController);
  setInterval(() => {
    appController.inviaOrdineAutomatico();
  }, 5000);
}
bootstrap();
