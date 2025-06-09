import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Prodotto } from './prodotto.interface';  //serve per test
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appService = app.get(AppService);
   app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: ['nats://nats-inventario:4222'],
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000); 
  const prodotto: Prodotto = {
    nome: "Prodotto " + 1,
    quantita: 10,
    data: new Date().toISOString(), 
  };

  await appService.inviaProdottoInventarioA(prodotto);
}
bootstrap();
