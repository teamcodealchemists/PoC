import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { NatsJetStreamTransport } from '@nestjs-plugins/nestjs-nats-jetstream-transport';


import { AppController } from './interfaces/http/app.controller';
import { AppService } from './application/app.service';

import { InventarioMongo, InventarioSchema } from './infrastructure/schemas/inventario.schema';
import { InventarioRepositoryMongo } from './infrastructure/adapters/mongo_db/inventario.repository.impl';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://mongo:27017/inventario'),
    MongooseModule.forFeature([
      { name: InventarioMongo.name, schema: InventarioSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: 'InventarioRepository', useClass: InventarioRepositoryMongo },
  ],
})

@Module({
  imports: [
    NatsJetStreamTransport.register({
      connectionOptions: {
        servers: 'localhost:3000',
        name: 'inventario-publisher',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
